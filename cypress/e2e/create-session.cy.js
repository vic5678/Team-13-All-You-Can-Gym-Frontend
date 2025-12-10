// cypress/e2e/create-session.cy.js

describe('Create Session E2E Flow', () => {
  const testAdmin = {
    username: 'testadmin@test.com',
    password: 'Test123!'
  };

  const newSession = {
    name: 'Evening Yoga Flow',
    description: 'Relaxing evening yoga session for all levels',
    type: 'Yoga',
    capacity: '20',
    trainer: 'Maria Rodriguez',
    dateTime: '2025-12-15T18:00'
  };

  beforeEach(() => {
    // Clear local storage and cookies before each test
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('should successfully create a new session as admin', () => {
    // ========== STEP 1: LOGIN AS ADMIN ==========
    cy.log('Logging in as gym admin');
    cy.visit('/Login');
    
    // Toggle admin mode
    cy.get('#isAdmin').check();
    
    // Fill in admin credentials
    cy.get('input[name="username"]').type(testAdmin.username);
    cy.get('input[name="password"]').type(testAdmin.password);
    
    // Submit login form
    cy.get('form').submit();
    
    // Verify redirect to AdminHome
    cy.url().should('include', '/AdminHome', { timeout: 10000 });
    cy.log('Successfully logged in as admin');

    // ========== STEP 2: NAVIGATE TO CREATE SESSION ==========
    cy.log('Navigating to Create Session page');
    
    // Click on "Create session" button/link
    cy.contains(/create session/i).click();
    
    // Verify navigation to create session page
    cy.url().should('include', '/admin/create-session', { timeout: 5000 });
    cy.contains(/create session|session details/i).should('be.visible');
    cy.log('On Create Session page');

    // ========== STEP 3: WAIT FOR GYMS TO LOAD ==========
    cy.log('Waiting for gym dropdown to be ready');
    cy.wait(2000); // Wait for gyms to load

    // ========== STEP 4: FILL SESSION NAME ==========
    cy.log('Filling session name');
    cy.get('input[name="name"]').clear().type(newSession.name);
    cy.log(`Session name set to: ${newSession.name}`);

    // ========== STEP 5: FILL DATE & TIME ==========
    cy.log('Filling date and time');
    cy.get('input[name="dateTime"]').clear().type(newSession.dateTime);
    cy.log(`Date/Time set to: ${newSession.dateTime}`);

    // ========== STEP 6: SELECT GYM FROM DROPDOWN ==========
    cy.log('Selecting gym from dropdown');
    
    // Click on the gym dropdown to open it
    cy.contains('Gym').parent().click();
    
    // Wait for dropdown to open
    cy.wait(500);
    
    // Select the first gym from the dropdown list (should be "Test Gym")
    cy.get('div').contains('Test Gym').click();
    cy.log('Test Gym selected');

    // ========== STEP 7: FILL DESCRIPTION ==========
    cy.log('Filling session description');
    cy.get('input[name="description"]').clear().type(newSession.description);
    cy.log(`Description set to: ${newSession.description}`);

    // ========== STEP 8: FILL TYPE ==========
    cy.log('Filling session type');
    cy.get('input[name="type"]').clear().type(newSession.type);
    cy.log(`Type set to: ${newSession.type}`);

    // ========== STEP 9: FILL CAPACITY ==========
    cy.log('Filling session capacity');
    cy.get('input[name="capacity"]').clear().type(newSession.capacity);
    cy.log(`Capacity set to: ${newSession.capacity}`);

    // ========== STEP 10: FILL TRAINER NAME ==========
    cy.log('Filling trainer name');
    cy.get('input[name="trainer"]').clear().type(newSession.trainer);
    cy.log(`Trainer name set to: ${newSession.trainer}`);

    // ========== STEP 11: SUBMIT THE FORM ==========
    cy.log('Submitting the create session form');
    
    // Handle the alert that will appear after successful creation
    cy.on('window:alert', (text) => {
      expect(text).to.contains('successfully');
    });
    
    cy.contains('button', /save|create/i).click();

    // ========== STEP 12: VERIFY SUCCESS ==========
    cy.log('Verifying session creation success');
    
    // Check for redirect to sessions list
    cy.url().should('include', '/admin/sessions', { timeout: 10000 });
    
    cy.log('Session created successfully!');
  });

  it('should show validation error when required fields are missing', () => {
    // ========== LOGIN AS ADMIN ==========
    cy.log('Logging in as gym admin for validation test');
    cy.visit('/Login');
    
    // Toggle admin mode
    cy.get('#isAdmin').check();
    
    cy.get('input[name="username"]').type(testAdmin.username);
    cy.get('input[name="password"]').type(testAdmin.password);
    cy.get('form').submit();
    cy.url().should('include', '/AdminHome', { timeout: 10000 });

    // ========== NAVIGATE TO CREATE SESSION ==========
    cy.log('Navigating to Create Session page');
    cy.contains(/create session/i).click();
    cy.url().should('include', '/admin/create-session', { timeout: 5000 });

    // ========== TRY TO SUBMIT WITHOUT FILLING REQUIRED FIELDS ==========
    cy.log('Attempting to submit without required fields');
    
    // Only fill the name field, leave others empty
    cy.get('input[name="name"]').clear().type('Incomplete Session');
    
    // Try to submit
    cy.contains('button', /save|create/i).click();
    
    // ========== VERIFY ERROR MESSAGE ==========
    cy.log('Checking for validation error');
    cy.contains(/required|mandatory|fill/i, { timeout: 3000 }).should('be.visible');
    
    cy.log('Validation error displayed correctly');
  });

  it('should be able to clear field values using clear buttons', () => {
    // ========== LOGIN AS ADMIN ==========
    cy.log('Logging in as gym admin for clear button test');
    cy.visit('/Login');
    
    // Toggle admin mode
    cy.get('#isAdmin').check();
    
    cy.get('input[name="username"]').type(testAdmin.username);
    cy.get('input[name="password"]').type(testAdmin.password);
    cy.get('form').submit();
    cy.url().should('include', '/AdminHome', { timeout: 10000 });

    // ========== NAVIGATE TO CREATE SESSION ==========
    cy.log('Navigating to Create Session page');
    cy.contains(/create session/i).click();
    cy.url().should('include', '/admin/create-session', { timeout: 5000 });

    // ========== FILL AND CLEAR NAME FIELD ==========
    cy.log('Testing clear button functionality');
    cy.get('input[name="name"]').clear().type('Test Session');
    cy.get('input[name="name"]').should('have.value', 'Test Session');
    
    // Click the clear button (ⓧ) next to name field
    cy.get('input[name="name"]').parent().find('span').contains('ⓧ').click();
    cy.get('input[name="name"]').should('have.value', '');
    
    cy.log('Clear button works correctly');
  });

  it('should fail to create a session with invalid date (past date)', () => {
    // ========== STEP 1: LOGIN AS ADMIN ==========
    cy.log('Logging in as gym admin for unhappy path test');
    cy.visit('/Login');
    
    // Toggle admin mode
    cy.get('#isAdmin').check();
    
    // Fill in admin credentials
    cy.get('input[name="username"]').type(testAdmin.username);
    cy.get('input[name="password"]').type(testAdmin.password);
    
    // Submit login form
    cy.get('form').submit();
    
    // Verify redirect to AdminHome
    cy.url().should('include', '/AdminHome', { timeout: 10000 });
    cy.log('Successfully logged in as admin');

    // ========== STEP 2: NAVIGATE TO CREATE SESSION ==========
    cy.log('Navigating to Create Session page');
    cy.contains(/create session/i).click();
    cy.url().should('include', '/admin/create-session', { timeout: 5000 });
    cy.log('On Create Session page');

    // ========== STEP 3: WAIT FOR GYMS TO LOAD ==========
    cy.wait(2000);

    // ========== STEP 4: FILL SESSION DETAILS WITH INVALID DATA ==========
    cy.log('Filling session name');
    cy.get('input[name="name"]').clear().type('Invalid Session');

    // Set a PAST date (should fail validation)
    cy.log('Filling with past date (invalid)');
    cy.get('input[name="dateTime"]').clear().type('2023-01-01T10:00');

    // Select gym
    cy.log('Selecting gym');
    cy.contains('Gym').parent().click();
    cy.wait(500);
    cy.get('div').contains('Test Gym').click();

    cy.log('Filling capacity');
    cy.get('input[name="capacity"]').clear().type('50');

    // ========== STEP 5: ATTEMPT TO SUBMIT ==========
    cy.log('Submitting form with invalid data');
    cy.contains('button', /save|create/i).click();

    // ========== STEP 6: VERIFY ERROR HANDLING ==========
    cy.log('Verifying error handling');
    
    // The form should either show an error message or the page should remain on create-session
    // (indicating the request failed)
    cy.url().should('include', '/admin/create-session', { timeout: 5000 });
    
    // Check if an error message is displayed
    cy.contains(/error|invalid|failed|past|cannot create/i, { timeout: 3000 }).should('be.visible');
    
    cy.log('Error handling verified - session creation failed as expected');
  });

  it('should fail to create a session with excessive capacity', () => {
    // ========== STEP 1: LOGIN AS ADMIN ==========
    cy.log('Logging in as gym admin for capacity test');
    cy.visit('/Login');
    
    // Toggle admin mode
    cy.get('#isAdmin').check();
    
    // Fill in admin credentials
    cy.get('input[name="username"]').type(testAdmin.username);
    cy.get('input[name="password"]').type(testAdmin.password);
    
    // Submit login form
    cy.get('form').submit();
    
    // Verify redirect to AdminHome
    cy.url().should('include', '/AdminHome', { timeout: 10000 });

    // ========== STEP 2: NAVIGATE TO CREATE SESSION ==========
    cy.contains(/create session/i).click();
    cy.url().should('include', '/admin/create-session', { timeout: 5000 });

    // ========== STEP 3: WAIT FOR GYMS TO LOAD ==========
    cy.wait(2000);

    // ========== STEP 4: FILL SESSION DETAILS WITH EXCESSIVE CAPACITY ==========
    cy.log('Filling session with excessive capacity');
    cy.get('input[name="name"]').clear().type('Crowded Session');

    cy.get('input[name="dateTime"]').clear().type('2025-12-20T14:00');

    // Select gym
    cy.contains('Gym').parent().click();
    cy.wait(500);
    cy.get('div').contains('Test Gym').click();

    // Set unreasonably high capacity (backend should reject)
    cy.log('Setting excessive capacity (999999)');
    cy.get('input[name="capacity"]').clear().type('999999');

    cy.get('input[name="description"]').clear().type('This should fail');

    // ========== STEP 5: ATTEMPT TO SUBMIT ==========
    cy.contains('button', /save|create/i).click();

    // ========== STEP 6: VERIFY ERROR RESPONSE ==========
    cy.log('Verifying error response for excessive capacity');
    
    // Should remain on create-session page or show error
    cy.url().should('include', '/admin/create-session', { timeout: 5000 });
    
    // Check for error message
    cy.contains(/error|capacity|invalid|failed/i, { timeout: 3000 }).should('be.visible');
    
    cy.log('Capacity validation working - session creation failed as expected');
  });
});
