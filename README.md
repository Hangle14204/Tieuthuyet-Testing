# Reading Stories Tieuthuyet.vn Website

## Overview

This project focuses on both manual and automated testing for a web-based system to ensure functionality, performance, and user experience quality.
The testing process includes test planning, test case design, automation testing, performance testing, and defect tracking.

## Objectives

* Ensure system stability through regression testing
* Validate core functionalities and UI/UX
* Improve test efficiency with automation
* Identify and track defects effectively

## Scope of Testing

The testing scope includes validation of core features and system behavior of the online reading platform, covering both manual and automated testing activities.

1. In Scope:
  * Functional testing of main features:
    - User authentication (login, registration)
    - Stories browsing and search
    - Reading stories/chapters
    - Posting and managing stories
    - Virtual currency (gold) top-up functionality
  * User Interface (UI) validation across key pages
  * Integration testing between modules (user, content, deposit gold)
  * SEO-related validation for story pages
  * Regression testing for existing features
  * End-to-End testing using Cypress
  * Basic security testing (penetration testing)
2. Out of Scope: 
  * Third-party payment gateway behavior
  * Mobile application testing

## Testing Activities

* Manual Testing:
  - Designed and documented 203 test cases.
  - Covered: Core system functionalities; User Interface (UI); Business workflows.
  - Test cases are available in the project documentation
* Automated Testing:
  - Developed 50 End-to-End (E2E) test scripts using Cypress.
  - Covered: Functional testing; Module integration; SEO validation. 
* Performance Testing:
  - Conducted performance analysis using: Chrome DevTools; Google PageSpeed Insights; Lighthouse.
  - Performed load testing with JMeter
* Bug Tracking & Reporting:
  - Identified and reported 31 defects.
  - Tracked bug lifecycle using Jira.
  - Performed re-testing after fixes to ensure quality

## Technologies Used

* Language: JavaScript
* Automation: Cypress
* Performance: Chrome DevTools, PageSpeed Insights, Lighthouse
* Load Testing: JMeter
* IDE: Visual Studio Code
* Bug Tracking: Jira

## How to Run

1. Clone repository:
   
   git clone https://github.com/Hangle14204/Tieuthuyet-Testing.git
   
   cd tieuthuyet_testing
   
3. Install dependencies:
   
   npm install
   
5. Open Cypress
   
   npx cypress open
   
   or headless mode: npx cypress run --browser chrome
   
## Test Environment

- Target system: Live website
- Environment: Production
- URL: https://tieuthuyet.vn/

## Author
Hangle
