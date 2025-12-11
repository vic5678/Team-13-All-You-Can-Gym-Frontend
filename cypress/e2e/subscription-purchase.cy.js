// cypress/e2e/subscription-purchase.cy.js

describe('Subscription Purchase E2E Flow', () => {
  const testUser = {
    username: 'user2@example.com',
    password: 'password456'
  };


  beforeEach(() => {
    // Clear local storage and cookies before each test
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.visit('/login');
  });

 
  // Alternative test with more specific selectors (customize based on your HTML)
  it('should purchase subscription with specific element selectors', () => {
    // LOGIN
    cy.get('input').eq(0).type(testUser.username);
    cy.get('input').eq(1).type(testUser.password);
    cy.get('form').submit();
    cy.url().should('include', '/Dashboard', { timeout: 10000 });

    // NAVIGATE TO PACKAGES
    cy.visit('/SubscriptionPackages');
    cy.contains(/select a plan|subscription packages/i).should('be.visible');

    // SELECT FIRST PACKAGE
    cy.contains(/\$.*month/i).first().click({ force: true });
    cy.url().should('include', '/plan/', { timeout: 10000 });

    // CLICK BUY
    cy.contains('button', /buy|purchase|checkout/i).click();
    cy.url().should('include', '/payment', { timeout: 10000 });

    // FILL PAYMENT FORM
    // ========== STEP 7: FILL PAYMENT INFORMATION ==========
    cy.log('Filling payment information');

    // The payment form already has pre-filled test values
    // Just verify they exist or clear and re-fill if needed
    // Card number (input 0)
    cy.get('input').eq(0).clear().type('5354 6786 8788 2324');



    // Expiry date (input 2)
    cy.get('input').eq(1).clear().type('12/26');

    // CVV (input 3)
    cy.get('input').eq(2).clear().type('234');
    // Cardholder name (input 1)

    cy.get('input').eq(3).clear().type('John Papadopoulos');
    cy.log('Payment information filled');

    // CONFIRM PAYMENT
    cy.contains('button', /confirm|complete|pay/i).click();
    cy.wait(3000);

    // VERIFY SUCCESS
    cy.url().should('match', /(dashboard|subscription|success)/i, { timeout: 10000 });
   
  });

  it('should fail to purchase subscription with invalid card number', () => {
    // LOGIN
    cy.get('input').eq(0).type(testUser.username);
    cy.get('input').eq(1).type(testUser.password);
    cy.get('form').submit();
    cy.url().should('include', '/Dashboard', { timeout: 10000 });

    // NAVIGATE TO PACKAGES
    cy.visit('/SubscriptionPackages');
    cy.contains(/select a plan|subscription packages/i).should('be.visible');

    // SELECT FIRST PACKAGE
    cy.contains(/\$.*month/i).first().click({ force: true });
    cy.url().should('include', '/plan/', { timeout: 10000 });

    // CLICK BUY
    cy.contains('button', /buy|purchase|checkout/i).click();
    cy.url().should('include', '/payment', { timeout: 10000 });

    // FILL PAYMENT FORM WITH INVALID CARD NUMBER
    cy.log('Filling payment information with invalid card number');

    // Card number with letters instead of numbers (INVALID)
    cy.get('input').eq(0).clear().type('abcd efgh ijkl mnop');

    // Expiry date (valid)
    cy.get('input').eq(1).clear().type('12/26');

    // CVV (valid)
    cy.get('input').eq(2).clear().type('234');

    // Cardholder name (valid)
    cy.get('input').eq(3).clear().type('John Papadopoulos');
    cy.log('Invalid payment information filled');

    // ATTEMPT TO CONFIRM PAYMENT
    cy.contains('button', /confirm|complete|pay/i).click();
    cy.wait(2000);

    // VERIFY FAILURE
    cy.log('Verifying payment rejection');
    
    // Should either:
    // 1. Show error message, or
    // 2. Stay on payment page (not redirect to dashboard/success)
    cy.get('body').then($body => {
      // Check if error message appears
      if ($body.text().includes('Invalid') || $body.text().includes('error') || $body.text().includes('failed')) {
        cy.log('Error message displayed');
        cy.contains(/invalid|error|failed/i).should('be.visible');
      } else {
        // Or verify we're still on payment page (didn't redirect to success)
        cy.url().should('include', '/payment', { timeout: 5000 });
        cy.log('Still on payment page - payment was rejected');
      }
    });
  });

  it('should fail to purchase subscription with invalid CVV', () => {
    // LOGIN
    cy.get('input').eq(0).type(testUser.username);
    cy.get('input').eq(1).type(testUser.password);
    cy.get('form').submit();
    cy.url().should('include', '/Dashboard', { timeout: 10000 });

    // NAVIGATE TO PACKAGES
    cy.visit('/SubscriptionPackages');
    cy.contains(/select a plan|subscription packages/i).should('be.visible');

    // SELECT FIRST PACKAGE
    cy.contains(/\$.*month/i).first().click({ force: true });
    cy.url().should('include', '/plan/', { timeout: 10000 });

    // CLICK BUY
    cy.contains('button', /buy|purchase|checkout/i).click();
    cy.url().should('include', '/payment', { timeout: 10000 });

    // FILL PAYMENT FORM WITH INVALID CVV
    cy.log('Filling payment information with invalid CVV');

    // Card number (valid)
    cy.get('input').eq(0).clear().type('5354 6786 8788 2324');

    // Expiry date (valid)
    cy.get('input').eq(1).clear().type('12/26');

    // CVV with letters instead of numbers (INVALID)
    cy.get('input').eq(2).clear().type('abc');

    // Cardholder name (valid)
    cy.get('input').eq(3).clear().type('John Papadopoulos');
    cy.log('Invalid CVV filled');

    // ATTEMPT TO CONFIRM PAYMENT
    cy.contains('button', /confirm|complete|pay/i).click();
    cy.wait(2000);

    // VERIFY FAILURE
    cy.log('Verifying payment rejection');
    
    // Should either show error or stay on payment page
    cy.get('body').then($body => {
      if ($body.text().includes('Invalid') || $body.text().includes('error') || $body.text().includes('failed')) {
        cy.log('Error message displayed');
        cy.contains(/invalid|error|failed/i).should('be.visible');
      } else {
        cy.url().should('include', '/payment', { timeout: 5000 });
        cy.log('Still on payment page - payment was rejected');
      }
    });
  });

  it('should fail to purchase subscription with expired card', () => {
    // LOGIN
    cy.get('input').eq(0).type(testUser.username);
    cy.get('input').eq(1).type(testUser.password);
    cy.get('form').submit();
    cy.url().should('include', '/Dashboard', { timeout: 10000 });

    // NAVIGATE TO PACKAGES
    cy.visit('/SubscriptionPackages');
    cy.contains(/select a plan|subscription packages/i).should('be.visible');

    // SELECT FIRST PACKAGE
    cy.contains(/\$.*month/i).first().click({ force: true });
    cy.url().should('include', '/plan/', { timeout: 10000 });

    // CLICK BUY
    cy.contains('button', /buy|purchase|checkout/i).click();
    cy.url().should('include', '/payment', { timeout: 10000 });

    // FILL PAYMENT FORM WITH EXPIRED DATE
    cy.log('Filling payment information with expired date');

    // Card number (valid)
    cy.get('input').eq(0).clear().type('5354 6786 8788 2324');

    // Expiry date (EXPIRED - past date)
    cy.get('input').eq(1).clear().type('01/20');

    // CVV (valid)
    cy.get('input').eq(2).clear().type('234');

    // Cardholder name (valid)
    cy.get('input').eq(3).clear().type('John Papadopoulos');
    cy.log('Expired date filled');

    // ATTEMPT TO CONFIRM PAYMENT
    cy.contains('button', /confirm|complete|pay/i).click();
    cy.wait(2000);

    // VERIFY FAILURE
    cy.log('Verifying payment rejection');
    
    // Should either show error or stay on payment page
    cy.get('body').then($body => {
      if ($body.text().includes('expired') || $body.text().includes('error') || $body.text().includes('failed')) {
        cy.log('Error message displayed');
        cy.contains(/expired|error|failed|invalid/i).should('be.visible');
      } else {
        cy.url().should('include', '/payment', { timeout: 5000 });
        cy.log('Still on payment page - payment was rejected');
      }
    });
  });
});