/**
 * BookingPage - Page Object Model for Booking Form
 * Contains locators and methods for interacting with the booking form
 */
export class BookingPage {
    constructor(page) {
        this.page = page;
        
        // Locators
        this.locators = {
            bookingSection: '#booking',
            bookingForm: '#booking form',
            firstname: '#firstname',
            lastname: '#lastname',
            email: '#email',
            phone: '#phone',
            bookBtn: 'button:has-text("Book")',
            confirmBtn: 'button:has-text("Confirm")',
            cancelBtn: 'button:has-text("Cancel")',
            errorMsg: '.error',
            successMsg: '.alert-success',
            dateFields: {
                checkin: 'input[placeholder="Check in"]',
                checkout: 'input[placeholder="Check out"]'
            }
        };
    }

    /**
     * Wait for booking form to be visible
     * @param {number} timeout - Timeout in milliseconds
     */
    async waitForForm(timeout = 10000) {
        await this.page.waitForSelector(this.locators.bookingForm, { 
            state: 'visible', 
            timeout 
        });
    }

    /**
     * Check if booking form is visible
     * @returns {Promise<boolean>} Is form visible
     */
    async isFormVisible() {
        return await this.page.locator(this.locators.bookingForm).isVisible();
    }

    /**
     * Fill a specific form field
     * @param {string} fieldName - Field name (firstname, lastname, email, phone)
     * @param {string} value - Value to fill
     */
    async fillField(fieldName, value) {
        const selector = this.locators[fieldName];
        if (!selector) {
            throw new Error(`Unknown field: ${fieldName}`);
        }
        await this.page.waitForSelector(selector, { timeout: 5000 });
        await this.page.fill(selector, value);
    }

    /**
     * Fill complete booking form
     * @param {Object} data - Booking data object
     * @param {string} data.firstname - First name
     * @param {string} data.lastname - Last name
     * @param {string} data.email - Email address
     * @param {string} data.phone - Phone number
     */
    async fillForm(data) {
        await this.waitForForm();
        
        const fields = ['firstname', 'lastname', 'email', 'phone'];
        
        for (const field of fields) {
            if (data[field]) {
                await this.fillField(field, data[field]);
            }
        }
    }

    /**
     * Fill form with dates
     * @param {Object} data - Booking data including dates
     * @param {string} data.checkin - Check-in date
     * @param {string} data.checkout - Check-out date
     */
    async fillFormWithDates(data) {
        await this.fillForm(data);
        
        if (data.checkin) {
            await this.page.fill(this.locators.dateFields.checkin, data.checkin);
        }
        
        if (data.checkout) {
            await this.page.fill(this.locators.dateFields.checkout, data.checkout);
        }
    }

    /**
     * Submit booking form
     */
    async submit() {
        await this.page.click(this.locators.bookBtn);
    }

    /**
     * Submit and wait for response
     * @param {number} timeout - Timeout in milliseconds
     */
    async submitAndWait(timeout = 5000) {
        await this.submit();
        await this.page.waitForTimeout(timeout);
    }

    /**
     * Confirm booking
     */
    async confirm() {
        await this.page.waitForSelector(this.locators.confirmBtn, { timeout: 5000 });
        await this.page.click(this.locators.confirmBtn);
    }

    /**
     * Cancel booking
     */
    async cancel() {
        await this.page.waitForSelector(this.locators.cancelBtn, { timeout: 5000 });
        await this.page.click(this.locators.cancelBtn);
    }

    /**
     * Get form field value
     * @param {string} fieldName - Field name
     * @returns {Promise<string>} Field value
     */
    async getFieldValue(fieldName) {
        const selector = this.locators[fieldName];
        if (!selector) {
            throw new Error(`Unknown field: ${fieldName}`);
        }
        return await this.page.inputValue(selector);
    }

    /**
     * Check if form has errors
     * @returns {Promise<boolean>} Has errors
     */
    async hasErrors() {
        const errorCount = await this.page.locator(this.locators.errorMsg).count();
        return errorCount > 0;
    }

    /**
     * Get error message
     * @returns {Promise<string>} Error message
     */
    async getErrorMessage() {
        if (await this.hasErrors()) {
            return await this.page.locator(this.locators.errorMsg).first().textContent();
        }
        return '';
    }

    /**
     * Check if booking was successful
     * @returns {Promise<boolean>} Was successful
     */
    async isSuccessful() {
        const successCount = await this.page.locator(this.locators.successMsg).count();
        return successCount > 0;
    }

    /**
     * Get success message
     * @returns {Promise<string>} Success message
     */
    async getSuccessMessage() {
        if (await this.isSuccessful()) {
            return await this.page.locator(this.locators.successMsg).textContent();
        }
        return '';
    }

    /**
     * Clear all form fields
     */
    async clearForm() {
        const fields = ['firstname', 'lastname', 'email', 'phone'];
        
        for (const field of fields) {
            const selector = this.locators[field];
            await this.page.fill(selector, '');
        }
    }

    /**
     * Validate form fields are filled
     * @param {Array<string>} fields - Fields to validate
     * @returns {Promise<boolean>} All fields filled
     */
    async validateFieldsFilled(fields) {
        for (const field of fields) {
            const value = await this.getFieldValue(field);
            if (!value || value.trim() === '') {
                return false;
            }
        }
        return true;
    }

    /**
     * Scroll to booking section
     */
    async scrollToBooking() {
        await this.page.locator(this.locators.bookingSection).scrollIntoViewIfNeeded();
    }

    /**
     * Get all form field values
     * @returns {Promise<Object>} Form values
     */
    async getFormValues() {
        return {
            firstname: await this.getFieldValue('firstname'),
            lastname: await this.getFieldValue('lastname'),
            email: await this.getFieldValue('email'),
            phone: await this.getFieldValue('phone')
        };
    }
}