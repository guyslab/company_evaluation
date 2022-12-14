# Company evaluation

## Summary

The purpose of the code is to follow a requirement for calculating and presenting the scores of companies.

## Activities

### Calculation

```mermain
flowchart TD

HOM [User in home page] --> EUS [Edit user scoring in place (optionally)]
EUS --> BTN [User clicks on "Recalculate" button];
BTN --> CLC [Evaluate all companies];
CLC --> DSP [Display company evaluations];
```

### Configuration

```mermain
flowchart TD

HOM [User in home page] --> CFG [User navigates to configuartion page];
CFG --> ADM [Is admin user?]
ADM -- Yes --> EDW [Edit default weights]
ADM -- No --> EUW [Edit user-configurable weights]
```

## Components & Flow

The implmentation consists of the following components:

* UI - for the user to configure weights, request evaluation, and see the scores.
* Evaluation service - to orchestrate the calculation process and provide the results
* Scoring service - for single-company score calculation, and weights

```mermain
sequenceDiagram
    participant UI
    participant Evaluation
    participant Scoring
    rect rgb(191, 223, 255)
    note right of UI: Calculation.
    UI->>+Evaluation: POST /evaluation
    par each company ID
        Evaluation->>+Scoring: POST /evaluations?company_id={id}
    end
    UI-)+Evaluation: GET /evaluations/latest/results
    Evaluation->>-UI: results
    rect rgb(210, 180, 255)
    note right of UI: Default weights configuartion.
    UI->>+Scoring: PUT /user-weights
    end
    rect rgb(200, 240, 230)
    note right of UI: Default weights configuartion.
    UI->>+Scoring: PUT /default-weights
    end
```

## Comments:

1. On production, there may be an extra API Gateway component to handle user authorization, depending how generic the product's permissions are (for instance if all the system's permissions can be defined in terms of roles - admin, etc.).
2. By the first required interface (implementation detail) - *API for calculating a company score by id*, the single-company scoring method should be invoked synchronously. If I were to design the requirement I would suggest invoking asyncronously for greater scalability.
3. Scoring service should persist company state. Such company state should be prefetched from a "Company service" (such as by events, ETLs, etc.) not implmented here.
4. Evaluation service should persist all the company IDs in order to orchestrate the batch operation. As in 3 above, Such list should be prefetched from a "Company service" not implemented here.