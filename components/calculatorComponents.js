/**
 * Reusable Alpine.js Calculator Components
 * Common patterns and mixins for calculator tools
 */

// Base calculator mixin with common functionality
const BaseCalculatorMixin = {
    // Common validation state
    errors: {},
    isValid: true,
    
    // Validation methods
    validateField(fieldName, value, rules = {}) {
        let validation = { isValid: true, error: null };
        
        // Required validation
        if (rules.required) {
            validation = CalculatorUtils.validateRequired(value);
            if (!validation.isValid) {
                this.errors[fieldName] = validation.error;
                this.isValid = false;
                return validation;
            }
        }
        
        // Number validation
        if (rules.type === 'number') {
            validation = CalculatorUtils.validateNumber(value, rules.min, rules.max);
            if (!validation.isValid) {
                this.errors[fieldName] = validation.error;
                this.isValid = false;
                return validation;
            }
        }
        
        // Percentage validation
        if (rules.type === 'percentage') {
            validation = CalculatorUtils.validatePercentage(value);
            if (!validation.isValid) {
                this.errors[fieldName] = validation.error;
                this.isValid = false;
                return validation;
            }
        }
        
        // Clear error if validation passes
        delete this.errors[fieldName];
        this.updateValidationState();
        return validation;
    },
    
    updateValidationState() {
        this.isValid = Object.keys(this.errors).length === 0;
    },
    
    clearErrors() {
        this.errors = {};
        this.isValid = true;
    },
    
    // Common formatting methods
    formatCurrency(amount) {
        return CalculatorUtils.formatCurrency(amount);
    },
    
    formatPercentage(value, decimals = 2) {
        return CalculatorUtils.formatPercentage(value, decimals);
    },
    
    formatNumber(value, decimals = 2) {
        return CalculatorUtils.formatNumber(value, decimals);
    },
    
    // Reset functionality
    reset() {
        // Override in specific calculators
        this.clearErrors();
    }
};

// Financial calculator specific mixin
const FinancialCalculatorMixin = {
    ...BaseCalculatorMixin,
    
    // Common financial calculations
    calculateCompoundInterest(principal, rate, periods, time) {
        return CalculatorUtils.compound(principal, rate / 100, periods, time);
    },
    
    calculateMonthlyPayment(principal, annualRate, years) {
        const monthlyRate = annualRate / 100 / 12;
        const numberOfPayments = years * 12;
        return CalculatorUtils.monthlyPayment(principal, monthlyRate, numberOfPayments);
    },
    
    calculateFutureValue(principal, rate, time) {
        return CalculatorUtils.compound(principal, rate / 100, 1, time);
    },
    
    calculatePresentValue(futureValue, rate, time) {
        return CalculatorUtils.presentValue(futureValue, rate / 100, time);
    }
};

// Business calculator specific mixin
const BusinessCalculatorMixin = {
    ...BaseCalculatorMixin,
    
    // Common business calculations
    calculateRatio(numerator, denominator) {
        return CalculatorUtils.calculateRatio(numerator, denominator);
    },
    
    calculatePercentageChange(oldValue, newValue) {
        return CalculatorUtils.calculatePercentageChange(oldValue, newValue);
    },
    
    calculateMargin(revenue, cost) {
        if (revenue === 0) return 0;
        return ((revenue - cost) / revenue) * 100;
    },
    
    calculateMarkup(cost, sellingPrice) {
        if (cost === 0) return 0;
        return ((sellingPrice - cost) / cost) * 100;
    }
};

// Investment calculator specific mixin
const InvestmentCalculatorMixin = {
    ...BaseCalculatorMixin,
    
    // Common investment calculations
    calculateROI(gain, cost) {
        if (cost === 0) return 0;
        return ((gain - cost) / cost) * 100;
    },
    
    calculateCAGR(beginningValue, endingValue, years) {
        if (beginningValue === 0 || years === 0) return 0;
        return (Math.pow(endingValue / beginningValue, 1 / years) - 1) * 100;
    },
    
    calculateYield(annualIncome, investment) {
        if (investment === 0) return 0;
        return (annualIncome / investment) * 100;
    }
};

// Export mixins for use in calculator components
if (typeof window !== 'undefined') {
    window.CalculatorMixins = {
        BaseCalculatorMixin,
        FinancialCalculatorMixin,
        BusinessCalculatorMixin,
        InvestmentCalculatorMixin
    };
}