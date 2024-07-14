const conversionFactors = {
    length: {
        meters: 1,
        kilometers: 0.001,
        centimeters: 100,
        millimeters: 1000,
        miles: 0.000621371,
        yards: 1.09361,
        feet: 3.28084,
        inches: 39.3701
    },
    weight: {
        kilograms: 1,
        grams: 1000,
        milligrams: 1e6,
        metric_tons: 0.001,
        pounds: 2.20462,
        ounces: 35.274,
        stones: 0.157473
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
        gallons: 0.264172,
        quarts: 1.05669,
        pints: 2.11338,
        cups: 4.22675
    },
    time: {
        seconds: 1,
        minutes: 1/60,
        hours: 1/3600,
        days: 1/86400,
        weeks: 1/604800,
        months: 1/2629746,
        years: 1/31556952
    },
    speed: {
        meters_per_second: 1,
        kilometers_per_hour: 3.6,
        miles_per_hour: 2.23694,
        knots: 1.94384
    },
    area: {
        square_meters: 1,
        square_kilometers: 1e-6,
        square_feet: 10.7639,
        square_yards: 1.19599,
        acres: 0.000247105,
        hectares: 0.0001
    },
    energy: {
        joules: 1,
        kilojoules: 0.001,
        calories: 0.239006,
        kilocalories: 0.000239006,
        watt_hours: 0.000277778,
        kilowatt_hours: 2.77778e-7
    },
    power: {
        watts: 1,
        kilowatts: 0.001,
        horsepower: 0.00134102,
        btus_per_hour: 3.41214
    },
    pressure: {
        pascals: 1,
        kilopascals: 0.001,
        bars: 1e-5,
        atmospheres: 9.86923e-6,
        psi: 0.000145038
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

    document.getElementById('result').innerHTML = `${inputValue} ${fromUnit} = ${result.toFixed(4)} ${toUnit}`;
}

function convertTemperature(value, from, to) {
    let celsius;

    // Convert to Celsius
    switch (from) {
        case 'celsius':
            celsius = value;
            break;
        case 'fahrenheit':
            celsius = (value - 32) * 5/9;
            break;
        case 'kelvin':
            celsius = value - 273.15;
            break;
    }

    // Convert from Celsius to target unit
    switch (to) {
        case 'celsius':
            return celsius;
        case 'fahrenheit':
            return (celsius * 9/5) + 32;
        case 'kelvin':
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
        fromUnit.options.add(new Option(unit, unit));
        toUnit.options.add(new Option(unit, unit));
    }
}

// Call populateUnitOptions when the page loads
window.onload = populateUnitOptions;