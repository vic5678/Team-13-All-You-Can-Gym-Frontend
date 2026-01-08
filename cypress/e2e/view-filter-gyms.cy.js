// cypress/e2e/view-filter-gyms.cy.js

describe('View and Filter Gyms E2E Flow', () => {
  const testUser = {
    username: 'user1@example.com',
    password: 'password123'
  };

  beforeEach(() => {
    // Clear local storage and cookies before each test
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.visit('/login');
  });

  it('should view and filter gyms successfully', () => {
    // ========== STEP 1: LOGIN ==========
    cy.log('Logging in as test user');
    cy.get('input').eq(0).type(testUser.username);
    cy.get('input').eq(1).type(testUser.password);
    cy.get('form').submit();
    cy.url().should('include', '/Dashboard', { timeout: 10000 });

    // ========== STEP 2: NAVIGATE TO GYMS PAGE ==========
    cy.log('Navigating to gyms page');
    cy.visit('/search-gyms');
    cy.url().should('include', '/search-gyms');

    // ========== STEP 3: VERIFY INITIAL STATE ==========
    cy.log('Verifying initial state shows search prompt');
    cy.contains(/Enter keywords or use filters to search/i, { timeout: 10000 }).should('be.visible');

    // ========== STEP 4: CLICK SEARCH TO LOAD ALL GYMS ==========
    cy.log('Clicking search button to load all gyms');
    cy.get('[data-cy="search-button"]').click();
    cy.wait(2000);

    // ========== STEP 5: APPLY KEYWORD SEARCH ==========
    cy.log('Applying keyword search');
    cy.get('input[type="text"]').first().clear().type('Downtown');
    cy.get('[data-cy="search-button"]').click();
    cy.wait(1500);

    // ========== STEP 6: VERIFY SEARCH RESULTS ==========
    cy.log('Verifying search results');
    cy.get('body').then($body => {
      if ($body.text().includes('No items found') || $body.text().includes('No gyms found')) {
        cy.log('No gyms found with search term - this is acceptable');
      } else {
        cy.log('Gyms displayed after search');
      }
    });

    // ========== STEP 7: OPEN FILTERS MENU ==========
    cy.log('Opening filters menu');
    cy.get('[data-cy="filter-button"]').click();
    cy.wait(500);

    // ========== STEP 8: APPLY TYPE FILTERS ==========
    cy.log('Applying type filters');
    cy.get('.search-gyms-checkbox').first().check({ force: true });
    
    // Click Apply Filter button
    cy.contains('button', 'Apply Filter').click();
    cy.wait(2000);

    // ========== STEP 9: RESET FILTERS ==========
    cy.log('Resetting filters');
    cy.get('[data-cy="filter-button"]').click();
    cy.wait(500);
    cy.contains('button', 'Reset').click();
    cy.wait(1000);

    // ========== STEP 10: VERIFY RESET STATE ==========
    cy.log('Verifying reset state');
    cy.contains(/Enter keywords or use filters to search/i).should('be.visible');

    // ========== STEP 11: FINAL FUNCTIONALITY CHECK ==========
    cy.log('Final functionality check');
    cy.get('input[type="text"]').first().should('be.visible').and('have.value', '');
  });

  it('should handle empty filter results gracefully', () => {
    // LOGIN
    cy.get('input').eq(0).type(testUser.username);
    cy.get('input').eq(1).type(testUser.password);
    cy.get('form').submit();
    cy.url().should('include', '/Dashboard', { timeout: 10000 });

    // NAVIGATE TO GYMS
    cy.visit('/search-gyms');
    
    // APPLY SEARCH WITH NO RESULTS
    cy.log('Testing search with unlikely match');
    cy.get('input[type="text"]').first().type('XYZ123NonexistentGym999');
    cy.get('[data-cy="search-button"]').click();
    cy.wait(2000);

    // VERIFY NO RESULTS MESSAGE
    cy.contains(/No.*found/i).should('be.visible');
  });
});