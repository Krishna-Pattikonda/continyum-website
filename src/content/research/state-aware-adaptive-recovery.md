---
title: State-Aware Adaptive Recovery for Reliable Tool-Using Large Language Model Agents Under Dynamic Execution Conditions
description: Developing an adaptive recovery framework that enables LLM agents to detect execution failures, understand their current state, and select appropriate recovery strategies to complete tasks reliably under dynamic conditions.
date: 2026-11-12
status: In progress
draft: false
---

## Overview

Large language model agents are increasingly asked to do real work: call APIs, query databases, operate software and chain many steps together. In those settings things go wrong. A service times out, a response changes shape, a permission is missing, or the world moves on between one step and the next.

This project develops an adaptive recovery framework that helps tool-using agents handle those moments well, so that a task still gets completed reliably when execution conditions change underneath it.

## The questions we're working on

- **Detection.** How can an agent recognise that a step has failed, including failures that don't announce themselves with an error?
- **State awareness.** After a failure, what does the agent actually know about where it is: what has already happened, what has changed, and what is still true?
- **Strategy selection.** Given that state, which recovery strategy fits best: retrying, repairing the input, choosing a different tool, rolling back, or asking for help?

## Why it matters

For enterprises, an agent that works most of the time isn't enough. Reliability under imperfect, changing conditions is what decides whether an agent can be trusted with real workflows. That is the gap this research aims to close.

## Status

This work is in progress. We'll publish the paper on this page when it's ready. If you'd like to collaborate or hear about it first, [get in touch](../../contact/).
