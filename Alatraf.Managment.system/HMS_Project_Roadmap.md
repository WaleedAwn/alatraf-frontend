# Hospital Management System (HMS) Project Roadmap

This document outlines the step-by-step plan for building your enterprise-scale Angular application using the proposed feature-based architecture.

Follow these steps sequentially. Do not proceed until the current phase or step is stable and tested.

## Phase 1: Setup & Infrastructure (The Core)

This phase establishes the foundational services for the entire application.

1.  **Set up the Environment:**
    *   Create the Angular project: `ng new hospital-app --standalone`
    *   Manually set up the core directory structure: `src/app/core/`, `src/app/shared/`, and `src/app/features/`.

2.  **Define Core Models:**
    *   Create TypeScript interfaces in `src/app/core/models/` for core data structures (e.g., `ApiResponse`, `User`, `Patient`, `Appointment`).

3.  **Implement HttpClient & Interceptors:**
    *   Configure `provideHttpClient(withInterceptors([...]))` in `src/app/app.config.ts`.
    *   Implement the `error.interceptor.ts`.
    *   Implement the base `ApiService` in `src/app/core/services/api.service.ts` for standardized HTTP calls.

4.  **Implement Basic Authentication:**
    *   Create the `AuthService` in `src/app/core/services/auth.service.ts`.
    *   Create the `auth.interceptor.ts` (to attach JWT tokens).
    *   Implement `AuthGuard` in `src/app/core/guards/` for basic route protection.

---

## Phase 2: Building the First Feature (Registration -> Patients)

This phase focuses on building your first functional piece of business logic end-to-end.

1.  **Set Up Routing:**
    *   Configure `src/app/app.routes.ts` to lazy-load the `registration` feature.
    *   Set up the necessary child routes within `features/registration/`.

2.  **Build the "Patients" Sub-Feature:**
    *   Implement the Login component and ensure authentication is fully functional.
    *   Create the `PatientService` in `features/registration/patients/services/`.
    *   Build the `Patient Form` page using Angular Reactive Forms for data entry.
    *   Build the `Patient List` page to retrieve and display data fetched via the `PatientService`.

---

## Phase 3: Iteration & Expansion

This phase involves scaling the application by adding new features and refining reusable components.

1.  **Build the Next Sub-Feature (e.g., Tickets or Dashboard):**
    *   Repeat the development cycle (Service -> Components -> Routing) for the next domain in your architecture plan.

2.  **Refine Shared Components:**
    *   Move repeated UI elements (tables, modals, buttons, loaders) into the `src/app/shared/components/` library for reusability.

---

## Phase 4: Testing & Deployment

This final phase prepares the application for a production environment.

1.  **Implement Testing:**
    *   Write unit tests for core services (`AuthService`, `ApiService`).
    *   Write component tests for key UI components (`Patient List`, `Patient Form`).

2.  **Prepare for Production:**
    *   Configure `environment.prod.ts` with production API endpoints.
    *   Build the application for production: `ng build --configuration production`
    *   Deploy the resulting `dist/` folder to your chosen hosting provider.

---

## Roadblock Action Plan

When you get stuck, use this plan before searching for more courses:

*   **RxJS confusion:** Stop coding and watch the **"RxJS Crash Course - Reactivex From Zero to Hero"** on YouTube.
*   **Authentication/Guards issue:** Re-watch the relevant sections in "Angular - The Complete Guide (2025 Edition)" on Udemy.
*   **Forms issue:** Re-watch the "Handling Forms" section in the Udemy course and practice in isolation.
*   **Error messages:** Google the *exact* error message (usually leads to Stack Overflow).
*   **Messy architecture:** Review your initial architecture diagram and refactor code to strictly adhere to the Core/Shared/Feature separation.

