/**
 * Calculator Utility Functions
 * Common functions used across all calculator tools
 */

// Formatting utilities
const formatCurrency = (amount, currency = 'USD', locale = 'en-US') => {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount || 0);
};

const formatPercentage = (value, decimals = 2) => {
    return `${(value || 0).toFixed(decimals)}%`;
};

const formatNumber = (value, decimals = 2) => {
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    }).format(value || 0);
};

// Validation utilities
const validateNumber = (value, min = null, max = null) => {
    const num = parseFloat(value);
    if (isNaN(num)) return { isValid: false, error: 'Please enter a valid number' };
    if (min !== null && num < min) return { isValid: false, error: `Value must be at least ${min}` };
    if (max !== null && num > max) return { isValid: false, error: `Value must be no more than ${max}` };
    return { isValid: true, value: num };
};

const validateRequired = (value) => {
    if (value === null || value === undefined || value === '') {
        return { isValid: false, error: 'This field is required' };
    }
    return { isValid: true, value };
};

const validatePercentage = (value) => {
    const validation = validateNumber(value, 0, 100);
    if (!validation.isValid) return validation;
    return { isValid: true, value: validation.value };
};

// Mathematical utilities
const compound = (principal, rate, periods, time) => {
    return principal * Math.pow(1 + rate / periods, periods * time);
};

const presentValue = (futureValue, rate, periods) => {
    return futureValue / Math.pow(1 + rate, periods);
};

const futureValueAnnuity = (payment, rate, periods) => {
    if (rate === 0) return payment * periods;
    return payment * (Math.pow(1 + rate, periods) - 1) / rate;
};

const presentValueAnnuity = (payment, rate, periods) => {
    if (rate === 0) return payment * periods;
    return payment * (1 - Math.pow(1 + rate, -periods)) / rate;
};

const monthlyPayment = (principal, rate, periods) => {
    if (rate === 0) return principal / periods;
    return principal * (rate * Math.pow(1 + rate, periods)) / (Math.pow(1 + rate, periods) - 1);
};

// Common calculation patterns
const calculatePercentageChange = (oldValue, newValue) => {
    if (oldValue === 0) return newValue > 0 ? 100 : 0;
    return ((newValue - oldValue) / oldValue) * 100;
};

const calculateRatio = (numerator, denominator) => {
    if (denominator === 0) return 0;
    return numerator / denominator;
};

// Date utilities
const daysBetween = (date1, date2) => {
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.round(Math.abs((date1 - date2) / oneDay));
};

const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};

// Export for use in templates
if (typeof window !== 'undefined') {
    window.CalculatorUtils = {
        formatCurrency,
        formatPercentage,
        formatNumber,
        validateNumber,
        validateRequired,
        validatePercentage,
        compound,
        presentValue,
        futureValueAnnuity,
        presentValueAnnuity,
        monthlyPayment,
        calculatePercentageChange,
        calculateRatio,
        daysBetween,
        addDays
    };
}