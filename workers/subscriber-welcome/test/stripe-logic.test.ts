import { describe, expect, it } from "vitest";
import type Stripe from "stripe";

import {
  checkSubscriptionEligibility,
  extractWelcomeCandidate,
} from "../src/stripe-logic";

function invoicePaidEvent(
  overrides: Record<string, unknown> = {},
): Stripe.Event {
  return {
    id: "evt_live_123",
    object: "event",
    api_version: "2025-09-30.clover",
    created: 1_785_294_000,
    data: {
      object: {
        id: "in_123",
        object: "invoice",
        amount_paid: 50000,
        billing_reason: "subscription_create",
        customer: "cus_123",
        customer_email: "subscriber@example.com",
        customer_name: "山友",
        parent: {
          type: "subscription_details",
          subscription_details: {
            subscription: "sub_123",
            metadata: {
              project: "yunshenmao",
              plan: "monthly-500",
            },
          },
        },
        status: "paid",
        ...overrides,
      },
    },
    livemode: true,
    pending_webhooks: 1,
    request: null,
    type: "invoice.paid",
  } as unknown as Stripe.Event;
}

function activeSubscription(
  overrides: Record<string, unknown> = {},
): Stripe.Subscription {
  return {
    id: "sub_123",
    object: "subscription",
    cancel_at: null,
    cancel_at_period_end: false,
    canceled_at: null,
    customer: "cus_123",
    ended_at: null,
    metadata: {
      project: "yunshenmao",
      plan: "monthly-500",
    },
    pause_collection: null,
    status: "active",
    ...overrides,
  } as unknown as Stripe.Subscription;
}

describe("extractWelcomeCandidate", () => {
  it("accepts a paid first monthly invoice for yunshenmao", () => {
    const result = extractWelcomeCandidate(invoicePaidEvent());

    expect(result.accepted).toBe(true);
    if (!result.accepted) return;
    expect(result.params).toMatchObject({
      invoiceId: "in_123",
      subscriptionId: "sub_123",
      customerId: "cus_123",
      customerEmail: "subscriber@example.com",
      plan: "monthly-500",
    });
  });

  it("rejects test-mode events", () => {
    const event = invoicePaidEvent();
    event.livemode = false;
    expect(extractWelcomeCandidate(event)).toEqual({
      accepted: false,
      reason: "test_event",
    });
  });

  it("rejects renewal invoices", () => {
    expect(
      extractWelcomeCandidate(
        invoicePaidEvent({ billing_reason: "subscription_cycle" }),
      ),
    ).toEqual({
      accepted: false,
      reason: "not_initial_subscription_invoice",
    });
  });

  it("rejects another Stripe project", () => {
    const event = invoicePaidEvent({
      parent: {
        type: "subscription_details",
        subscription_details: {
          subscription: "sub_123",
          metadata: { project: "tripcairn", plan: "monthly-500" },
        },
      },
    });
    expect(extractWelcomeCandidate(event)).toEqual({
      accepted: false,
      reason: "wrong_project",
    });
  });

  it("rejects an unknown monthly plan", () => {
    const event = invoicePaidEvent({
      parent: {
        type: "subscription_details",
        subscription_details: {
          subscription: "sub_123",
          metadata: { project: "yunshenmao", plan: "monthly-custom" },
        },
      },
    });
    expect(extractWelcomeCandidate(event)).toEqual({
      accepted: false,
      reason: "wrong_plan",
    });
  });
});

describe("checkSubscriptionEligibility", () => {
  it("accepts an active, uncancelled monthly subscription", () => {
    expect(
      checkSubscriptionEligibility(activeSubscription(), {
        customerId: "cus_123",
      }),
    ).toEqual({ eligible: true, reason: "eligible" });
  });

  it("rejects cancellation scheduled during the five-minute wait", () => {
    expect(
      checkSubscriptionEligibility(
        activeSubscription({ cancel_at_period_end: true }),
        { customerId: "cus_123" },
      ),
    ).toEqual({ eligible: false, reason: "cancellation_scheduled" });
  });

  it("rejects paused subscriptions", () => {
    expect(
      checkSubscriptionEligibility(
        activeSubscription({
          pause_collection: { behavior: "void", resumes_at: null },
        }),
        { customerId: "cus_123" },
      ),
    ).toEqual({ eligible: false, reason: "paused" });
  });
});
