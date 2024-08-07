function formatUnitName(unit) {
    return unit.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}
const conversionFactors = {
    length: {
        meters: { factor: 1, abbr: 'm' },
        kilometers: { factor: 0.001, abbr: 'km' },
        centimeters: { factor: 100, abbr: 'cm' },
        millimeters: { factor: 1000, abbr: 'mm' },
        micrometers: { factor: 1e6, abbr: 'µm' },
        nanometers: { factor: 1e9, abbr: 'nm' },
        miles: { factor: 0.000621371, abbr: 'mi' },
        yards: { factor: 1.09361, abbr: 'yd' },
        feet: { factor: 3.28084, abbr: 'ft' },
        inches: { factor: 39.3701, abbr: 'in' },
        nautical_miles: { factor: 0.000539957, abbr: 'nmi' }
    },
    weight: {
        kilograms: { factor: 1, abbr: 'kg' },
        grams: { factor: 1000, abbr: 'g' },
        milligrams: { factor: 1e6, abbr: 'mg' },
        metric_tons: { factor: 0.001, abbr: 't' },
        pounds: { factor: 2.20462, abbr: 'lb' },
        ounces: { factor: 35.274, abbr: 'oz' },
        carats: { factor: 5000, abbr: 'ct' },
        long_tons: { factor: 0.000984207, abbr: 'long tn' },
        short_tons: { factor: 0.00110231, abbr: 'short tn' },
        stone: { factor: 0.157473, abbr: 'st' }
    },
    temperature: {
        celsius: { factor: 1, abbr: '°C' },
        fahrenheit: { factor: 1, abbr: '°F' },
        kelvin: { factor: 1, abbr: 'K' }
    },
    volume: {
        liters: { factor: 1, abbr: 'L' },
        milliliters: { factor: 1000, abbr: 'mL' },
        cubic_meters: { factor: 0.001, abbr: 'm³' },
        cubic_centimeters: { factor: 1000, abbr: 'cm³' },
        cubic_feet: { factor: 0.0353147, abbr: 'ft³' },
        cubic_inches: { factor: 61.0237, abbr: 'in³' },
        gallons_us: { factor: 0.264172, abbr: 'gal (US)' },
        quarts_us: { factor: 1.05669, abbr: 'qt (US)' },
        pints_us: { factor: 2.11338, abbr: 'pt (US)' },
        cups_us: { factor: 4.22675, abbr: 'cup (US)' },
        fluid_ounces_us: { factor: 33.814, abbr: 'fl oz (US)' },
        tablespoons_us: { factor: 67.628, abbr: 'tbsp (US)' },
        teaspoons_us: { factor: 202.884, abbr: 'tsp (US)' },
        gallons_uk: { factor: 0.219969, abbr: 'gal (UK)' },
        quarts_uk: { factor: 0.879877, abbr: 'qt (UK)' },
        pints_uk: { factor: 1.75975, abbr: 'pt (UK)' },
        cups_uk: { factor: 3.51951, abbr: 'cup (UK)' },
        fluid_ounces_uk: { factor: 35.1951, abbr: 'fl oz (UK)' },
        tablespoons_uk: { factor: 56.3121, abbr: 'tbsp (UK)' },
        teaspoons_uk: { factor: 168.936, abbr: 'tsp (UK)' }
    },
    time: {
        seconds: { factor: 1, abbr: 's' },
        milliseconds: { factor: 1000, abbr: 'ms' },
        microseconds: { factor: 1e6, abbr: 'µs' },
        nanoseconds: { factor: 1e9, abbr: 'ns' },
        minutes: { factor: 1 / 60, abbr: 'min' },
        hours: { factor: 1 / 3600, abbr: 'h' },
        days: { factor: 1 / 86400, abbr: 'd' },
        weeks: { factor: 1 / 604800, abbr: 'wk' },
        months: { factor: 1 / 2629746, abbr: 'mo' },
        years: { factor: 1 / 31556952, abbr: 'yr' },
        decades: { factor: 1 / 315569520, abbr: 'dec' },
        centuries: { factor: 1 / 3155695200, abbr: 'cent' }
    },
    speed: {
        meters_per_second: { factor: 1, abbr: 'm/s' },
        kilometers_per_hour: { factor: 3.6, abbr: 'km/h' },
        miles_per_hour: { factor: 2.23694, abbr: 'mph' },
        feet_per_second: { factor: 3.28084, abbr: 'ft/s' },
        knots: { factor: 1.94384, abbr: 'kn' }
    },
    area: {
        square_meters: { factor: 1, abbr: 'm²' },
        square_kilometers: { factor: 1e-6, abbr: 'km²' },
        square_centimeters: { factor: 10000, abbr: 'cm²' },
        square_millimeters: { factor: 1e6, abbr: 'mm²' },
        square_miles: { factor: 3.861e-7, abbr: 'mi²' },
        square_yards: { factor: 1.19599, abbr: 'yd²' },
        square_feet: { factor: 10.7639, abbr: 'ft²' },
        square_inches: { factor: 1550, abbr: 'in²' },
        hectares: { factor: 1e-4, abbr: 'ha' },
        acres: { factor: 0.000247105, abbr: 'ac' }
    },
    energy: {
        joules: { factor: 1, abbr: 'J' },
        kilojoules: { factor: 0.001, abbr: 'kJ' },
        calories: { factor: 0.239006, abbr: 'cal' },
        kilocalories: { factor: 0.000239006, abbr: 'kcal' },
        watt_hours: { factor: 0.000277778, abbr: 'Wh' },
        kilowatt_hours: { factor: 2.77778e-7, abbr: 'kWh' },
        electron_volts: { factor: 6.242e18, abbr: 'eV' },
        british_thermal_units: { factor: 0.000947817, abbr: 'BTU' },
        us_therms: { factor: 9.4804e-9, abbr: 'thm' },
        foot_pounds: { factor: 0.737562, abbr: 'ft·lb' }
    },
    power: {
        watts: { factor: 1, abbr: 'W' },
        kilowatts: { factor: 0.001, abbr: 'kW' },
        horsepower: { factor: 0.00134102, abbr: 'hp' },
        foot_pounds_per_minute: { factor: 44.2537, abbr: 'ft·lb/min' },
        british_thermal_units_per_hour: { factor: 3.41214, abbr: 'BTU/h' }
    },
    pressure: {
        pascals: { factor: 1, abbr: 'Pa' },
        kilopascals: { factor: 0.001, abbr: 'kPa' },
        megapascals: { factor: 1e-6, abbr: 'MPa' },
        bars: { factor: 1e-5, abbr: 'bar' },
        atmospheres: { factor: 9.86923e-6, abbr: 'atm' },
        torr: { factor: 0.00750062, abbr: 'Torr' },
        pounds_per_square_inch: { factor: 0.000145038, abbr: 'psi' }
    },
    data: {
        bits: { factor: 1, abbr: 'b' },
        bytes: { factor: 0.125, abbr: 'B' },
        kilobits: { factor: 0.001, abbr: 'Kb' },
        kilobytes: { factor: 0.000125, abbr: 'KB' },
        megabits: { factor: 1e-6, abbr: 'Mb' },
        megabytes: { factor: 1.25e-7, abbr: 'MB' },
        gigabits: { factor: 1e-9, abbr: 'Gb' },
        gigabytes: { factor: 1.25e-10, abbr: 'GB' },
        terabits: { factor: 1e-12, abbr: 'Tb' },
        terabytes: { factor: 1.25e-13, abbr: 'TB' }
    },
    angle: {
        degrees: { factor: 1, abbr: '°' },
        radians: { factor: 0.0174533, abbr: 'rad' },
        gradians: { factor: 1.11111, abbr: 'gon' },
        arcminutes: { factor: 60, abbr: '′' },
        arcseconds: { factor: 3600, abbr: '″' }
    }
    
};
const unitDescriptions = {
    length: "Length is a measure of distance between two points in one dimension. It is a fundamental quantity in physics and everyday life. Common units of length include meters (m), kilometers (km), centimeters (cm), millimeters (mm), inches (in), feet (ft), yards (yd), and miles (mi). The choice of unit depends on the scale of the measurement, from microscopic distances to astronomical distances.",
    weight: "Weight, often used interchangeably with mass in everyday language, is a measure of the amount of matter in an object. On Earth, weight is the force exerted on an object due to gravity. Common units of weight include kilograms (kg), grams (g), pounds (lb), ounces (oz), and tons. In scientific contexts, mass (measured in kilograms) is preferred over weight, as it remains constant regardless of gravitational field.",
    temperature: "Temperature is a measure of the average kinetic energy of particles in a substance, indicating how hot or cold it is. The three most commonly used temperature scales are Celsius (°C), Fahrenheit (°F), and Kelvin (K). Celsius and Fahrenheit are relative scales based on the freezing and boiling points of water, while Kelvin is an absolute scale used in scientific calculations, with 0 K representing absolute zero, the lowest possible temperature.",
    volume: "Volume is the amount of three-dimensional space occupied by a substance or object. It is measured in cubic units for solids (e.g., cubic meters, cubic feet) and in liters or gallons for liquids. Common units include liters (L), milliliters (mL), cubic meters (m³), cubic centimeters (cm³), gallons, quarts, and fluid ounces. Volume is crucial in various fields, including chemistry, physics, and everyday cooking and construction.",
    time: "Time is the ongoing sequence of events taking place. It is a fundamental quantity in physics and plays a crucial role in our daily lives. Common units of time include seconds (s), minutes (min), hours (h), days, weeks, months, and years. Smaller units like milliseconds (ms), microseconds (µs), and nanoseconds (ns) are used in scientific and technological applications, while larger units like decades and centuries are used for historical contexts.",
    speed: "Speed is the rate of change of position with respect to time, indicating how fast an object is moving. It is typically measured in units of distance per unit of time. Common units include meters per second (m/s), kilometers per hour (km/h), and miles per hour (mph). In nautical contexts, knots are used. Speed is a crucial concept in physics, transportation, and many aspects of everyday life.",
    area: "Area is a measure of the amount of space taken up by a two-dimensional surface. It is calculated by multiplying length by width for rectangular shapes, with more complex formulas for other shapes. Common units of area include square meters (m²), square kilometers (km²), square feet (ft²), square yards (yd²), acres, and hectares. Area measurements are essential in fields such as construction, land management, and physics.",
    energy: "Energy is the capacity to do work or cause change in a system. It exists in various forms, including kinetic, potential, thermal, electrical, and chemical energy. Common units of energy include joules (J), calories (cal), kilowatt-hours (kWh), and British Thermal Units (BTU). Energy is a fundamental concept in physics and plays a crucial role in understanding everything from subatomic particles to cosmic phenomena.",
    power: "Power is the rate at which energy is transferred or work is done. It is calculated by dividing energy by time. The standard unit of power is the watt (W), named after James Watt. Other common units include horsepower (hp), used especially for engine power, and kilowatts (kW). Power is an important concept in physics, engineering, and everyday applications like electricity consumption.",
    pressure: "Pressure is the force applied perpendicular to the surface of an object per unit area. It is particularly important in fluid mechanics and thermodynamics. The SI unit of pressure is the pascal (Pa), but other common units include atmospheres (atm), bars, and pounds per square inch (psi). Pressure is crucial in many applications, from weather forecasting to engineering and medicine.",
    data: "Data storage capacity is a measure of the amount of digital information that can be stored in a device or system. It is typically measured in bytes or bits, with prefixes like kilo-, mega-, giga-, and tera- used for larger quantities. One byte usually consists of 8 bits. These units are crucial in computing and digital technology, used to quantify storage capacity of devices, data transfer rates, and file sizes.",
    angle: "An angle is the figure formed by two rays or lines sharing a common endpoint, called the vertex. It is a measure of rotation and is fundamental in geometry, trigonometry, and many practical applications. The most common units for measuring angles are degrees (°), where a full circle is 360°, and radians, where a full circle is approximately 6.28 radians. Other units include gradians and arcminutes/arcseconds for more precise measurements."
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
        const baseValue = inputValue / conversionFactors[unitType][fromUnit].factor;
        result = baseValue * conversionFactors[unitType][toUnit].factor;
    }

    document.getElementById('result').innerHTML = `${inputValue} ${conversionFactors[unitType][fromUnit].abbr} = ${result.toFixed(6)} ${conversionFactors[unitType][toUnit].abbr}`;
    addToHistory(fromUnit, toUnit, inputValue, result.toFixed(6));
}


function convertTemperature(value, from, to) {
    if (from === to) return value;
    
    let celsius;
    if (from === 'celsius') {
        celsius = value;
    } else if (from === 'fahrenheit') {
        celsius = (value - 32) * 5 / 9;
    } else if (from === 'kelvin') {
        celsius = value - 273.15;
    }

    if (to === 'celsius') {
        return celsius;
    } else if (to === 'fahrenheit') {
        return (celsius * 9 / 5) + 32;
    } else if (to === 'kelvin') {
        return celsius + 273.15;
    }
}
function updateConversionRelationship() {
    const unitType = document.getElementById('unitType').value;
    const fromUnit = document.getElementById('fromUnit').value;
    const toUnit = document.getElementById('toUnit').value;

    const fromUnitInfo = conversionFactors[unitType][fromUnit];
    const toUnitInfo = conversionFactors[unitType][toUnit];

    let relationshipText = "";

    if (unitType === 'temperature') {
        relationshipText = getTemperatureRelationship(fromUnit, toUnit);
    } else {
        const conversionFactor = toUnitInfo.factor / fromUnitInfo.factor;
        relationshipText = `1 ${fromUnitInfo.abbr} = ${conversionFactor.toFixed(6)} ${toUnitInfo.abbr}`;
    }

    const relationshipElement = document.getElementById('conversionRelationship');
    relationshipElement.innerHTML = `
        <h2>${formatUnitName(fromUnit)} (${fromUnitInfo.abbr}) to ${formatUnitName(toUnit)} (${toUnitInfo.abbr})?</h2>
        <p>${relationshipText}. Both are used to measure ${unitType}.</p>
    `;
}

function getTemperatureRelationship(fromUnit, toUnit) {
    const relationships = {
        'celsius_fahrenheit': '°C to °F: Multiply by 9/5, then add 32',
        'celsius_kelvin': '°C to K: Add 273.15',
        'fahrenheit_celsius': '°F to °C: Subtract 32, then multiply by 5/9',
        'fahrenheit_kelvin': '°F to K: Subtract 32, multiply by 5/9, then add 273.15',
        'kelvin_celsius': 'K to °C: Subtract 273.15',
        'kelvin_fahrenheit': 'K to °F: Subtract 273.15, multiply by 9/5, then add 32'
    };
    const key = `${fromUnit}_${toUnit}`;
    return relationships[key] || 'Conversion formula varies';
}
function reverseUnits() {
    const fromUnit = document.getElementById('fromUnit');
    const toUnit = document.getElementById('toUnit');
    
    const tempValue = fromUnit.value;
    fromUnit.value = toUnit.value;
    toUnit.value = tempValue;
    
    updateConversionRelationship();
}
let conversionHistory = [];

function addToHistory(fromUnit, toUnit, inputValue, result) {
    const conversion = {
        from: fromUnit,
        to: toUnit,
        input: inputValue,
        output: result,
        timestamp: new Date().toLocaleString()
    };
    conversionHistory.unshift(conversion);
    if (conversionHistory.length > 10) {
        conversionHistory.pop();
    }
    updateHistoryDisplay();
}

function updateHistoryDisplay() {
    const historyElement = document.getElementById('conversionHistory');
    historyElement.innerHTML = '<h3>Recent Conversions</h3>';
    conversionHistory.forEach(conversion => {
        historyElement.innerHTML += `
            <p>${conversion.timestamp}: ${conversion.input} ${conversion.from} = ${conversion.output} ${conversion.to}</p>
        `;
    });
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
        const formattedUnit = formatUnitName(unit);
        const displayUnit = `${formattedUnit} (${conversionFactors[unitType][unit].abbr})`;
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

    // Update unit description
    updateUnitDescription(unitType);
    updateConversionRelationship();
}

function updateUnitDescription(unitType) {
    const descriptionElement = document.getElementById('unitDescription');
    descriptionElement.innerHTML = `<p>${unitDescriptions[unitType]}</p>`;
}

// Call populateUnitOptions when the page loads
window.onload = function() {
    populateUnitOptions();
    updateConversionRelationship();
    document.getElementById('reverseUnits').addEventListener('click', reverseUnits);
    const historyDiv = document.createElement('div');
    historyDiv.id = 'conversionHistory';
    document.querySelector('main').appendChild(historyDiv);
};

// Add event listener to unitType select element
document.getElementById('unitType').addEventListener('change', populateUnitOptions);
document.getElementById('fromUnit').addEventListener('change', updateConversionRelationship);
document.getElementById('toUnit').addEventListener('change', updateConversionRelationship);
document.getElementById('reverseUnits').addEventListener('click', reverseUnits);

