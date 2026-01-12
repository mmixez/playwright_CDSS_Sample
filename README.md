# California Child Support Services UI Tests

This repository contains automated UI tests for the [California Child Support Services](https://childsupport.ca.gov/) website using **Playwright** and **TypeScript**.
**Note:** These tests focus only on the **homepage** and a few key links and elements. They do **not cover all pages, links, or footer content** of the website.

## 🧪 Tests Included

The tests cover the following areas:

### Homepage
- Verify the homepage loads with the correct title.
- Verify the logo/title is visible and clickable (reloads homepage).

### Navigation Links
- "New Laws" link opens the Announcements page in a new tab.
- "Google Translate" link opens the Translate page in a new tab.
- "Manage Payments" link navigates to the State Disbursement Unit page.
- "See My Information" link navigates to the Customer Connect page.
- "Enroll in Services" link navigates to the Enroll page.
- "Calculate Support" link navigates to the Guideline Calculator page.
- "Video Library" link navigates to the Video Resource Library page.
- "Help Section" link navigates to the FAQ page.

### Accordion Sections
- "Enrollment Information" accordion expands and shows content.
- "Starting Services?" accordion expands and shows content.
- "Process Overview" accordion expands and shows content.
- "Already Have Services?" accordion expands and shows content.

### Navbar Dropdowns
- "Paying" menu expands and its links navigate correctly.
- "Online Case Information" navigates correctly.
- "Help with Debt" navigates correctly.
- "Military Specific Services" navigates correctly.

### Search Functionality
- Search bar returns expected results for the term `"agency"`.

### Homepage Videos
- Checks that at least two videos (English & Spanish) are present and visible.

### Test Run in Terminal
<img width="871" height="842" alt="ts_report" src="https://github.com/user-attachments/assets/721449e7-0c40-424e-b65e-9ed551efa839" />

### Allure Report
<img width="823" height="722" alt="alluree_report" src="https://github.com/user-attachments/assets/4db2113b-35a5-4f29-9bc8-55bdc5d41899" />
