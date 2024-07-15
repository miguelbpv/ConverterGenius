const conversionFactors = {
    length: {
        meters: 1,
        kilometers: 0.001,
        centimeters: 100,
        millimeters: 1000,
        micrometers: 1e6,
        nanometers: 1e9,
        miles: 0.000621371,
        yards: 1.09361,
        feet: 3.28084,
        inches: 39.3701,
        nautical_miles: 0.000539957
    },
    weight: {
        kilograms: 1,
        grams: 1000,
        milligrams: 1e6,
        metric_tons: 0.001,
        pounds: 2.20462,
        ounces: 35.274,
        carats: 5000,
        long_tons: 0.000984207,
        short_tons: 0.00110231,
        stone: 0.157473
    },
    temperature: {
        celsius: 0,
        fahrenheit: 32,
        kelvin: 273.15
    },
    volume: {
        liters: 1,
        milliliters: 1000,
        cubic_meters: 0.001,
        cubic_centimeters: 1000,
        cubic_feet: 0.0353147,
        cubic_inches: 61.0237,
        gallons_us: 0.264172,
        quarts_us: 1.05669,
        pints_us: 2.11338,
        cups_us: 4.22675,
        fluid_ounces_us: 33.814,
        tablespoons_us: 67.628,
        teaspoons_us: 202.884,
        gallons_uk: 0.219969,
        quarts_uk: 0.879877,
        pints_uk: 1.75975,
        cups_uk: 3.51951,
        fluid_ounces_uk: 35.1951,
        tablespoons_uk: 56.3121,
        teaspoons_uk: 168.936
    },
    time: {
        seconds: 1,
        milliseconds: 1000,
        microseconds: 1e6,
        nanoseconds: 1e9,
        minutes: 1/60,
        hours: 1/3600,
        days: 1/86400,
        weeks: 1/604800,
        months: 1/2629746,
        years: 1/31556952,
        decades: 1/315569520,
        centuries: 1/3155695200
    },
    speed: {
        meters_per_second: 1,
        kilometers_per_hour: 3.6,
        miles_per_hour: 2.23694,
        feet_per_second: 3.28084,
        knots: 1.94384
    },
    area: {
        square_meters: 1,
        square_kilometers: 1e-6,
        square_centimeters: 10000,
        square_millimeters: 1e6,
        square_miles: 3.861e-7,
        square_yards: 1.19599,
        square_feet: 10.7639,
        square_inches: 1550,
        hectares: 1e-4,
        acres: 0.000247105
    },
    energy: {
        joules: 1,
        kilojoules: 0.001,
        calories: 0.239006,
        kilocalories: 0.000239006,
        watt_hours: 0.000277778,
        kilowatt_hours: 2.77778e-7,
        electron_volts: 6.242e+18,
        british_thermal_units: 0.000947817,
        us_therms: 9.4804e-9,
        foot_pounds: 0.737562
    },
    power: {
        watts: 1,
        kilowatts: 0.001,
        horsepower: 0.00134102,
        foot_pounds_per_minute: 44.2537,
        british_thermal_units_per_hour: 3.41214
    },
    pressure: {
        pascals: 1,
        kilopascals: 0.001,
        megapascals: 1e-6,
        bars: 1e-5,
        atmospheres: 9.86923e-6,
        torr: 0.00750062,
        pounds_per_square_inch: 0.000145038
    },
    data: {
        bits: 1,
        bytes: 0.125,
        kilobits: 0.001,
        kilobytes: 0.000125,
        megabits: 1e-6,
        megabytes: 1.25e-7,
        gigabits: 1e-9,
        gigabytes: 1.25e-10,
        terabits: 1e-12,
        terabytes: 1.25e-13
    },
    angle: {
        degrees: 1,
        radians: 0.0174533,
        gradians: 1.11111,
        arcminutes: 60,
        arcseconds: 3600
    }
};

function convert() {
    const unitType = document.getElementById('unitType').value;
    const fromUnit = document.getElementById('fromUnit').value;
    const toUnit = document.getElementById('toUnit').value;
    const inputValue = parseFloat(document.getElementById('inputValue').value);

    if (isNaN(inputValue)) {
        document.getElementById('result').innerHTML = "Please enter a valid number";
        return;
    }

    let result;

    if (unitType === 'temperature') {
        result = convertTemperature(inputValue, fromUnit, toUnit);
    } else {
        const baseValue = inputValue / conversionFactors[unitType][fromUnit];
        result = baseValue * conversionFactors[unitType][toUnit];
    }

    document.getElementById('result').innerHTML = `${inputValue} ${fromUnit.replace('_', ' ')} = ${result.toFixed(6)} ${toUnit.replace('_', ' ')}`;
}

function convertTemperature(value, from, to) {
    if (from === to) return value;
    
    let celsius;
    if (from === 'celsius') {
        celsius = value;
    } else if (from === 'fahrenheit') {
        celsius = (value - 32) * 5/9;
    } else if (from === 'kelvin') {
        celsius = value - 273.15;
    }

    if (to === 'celsius') {
        return celsius;
    } else if (to === 'fahrenheit') {
        return (celsius * 9/5) + 32;
    } else if (to === 'kelvin') {
        return celsius + 273.15;
    }
}

function populateUnitOptions() {
    const unitType = document.getElementById('unitType').value;
    const fromUnit = document.getElementById('fromUnit');
    const toUnit = document.getElementById('toUnit');

    // Clear existing options
    fromUnit.innerHTML = '';
    toUnit.innerHTML = '';

    // Populate new options
    for (const unit in conversionFactors[unitType]) {
        const displayUnit = unit.replace('_', ' ');
        fromUnit.options.add(new Option(displayUnit, unit));
        toUnit.options.add(new Option(displayUnit, unit));
    }

    // Set default selections
    if (fromUnit.options.length > 0) {
        fromUnit.selectedIndex = 0;
    }
    if (toUnit.options.length > 1) {
        toUnit.selectedIndex = 1;
    }
}

// Call populateUnitOptions when the page loads
window.onload = populateUnitOptions;

// Add event listener to unitType select element
document.getElementById('unitType').addEventListener('change', populateUnitOptions);
