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
    fuel_consumption: {
        miles_per_gallon: { factor: 1, abbr: 'mpg' },
        kilometers_per_liter: { factor: 0.425144, abbr: 'km/L' },
        liters_per_100km: { factor: 235.215, abbr: 'L/100km' },
        miles_per_liter: { factor: 2.35215, abbr: 'mi/L' }
    },
    
    cooking: {
        us_cup: { factor: 1, abbr: 'US cup' },
        us_tablespoon: { factor: 16, abbr: 'US tbsp' },
        us_teaspoon: { factor: 48, abbr: 'US tsp' },
        milliliter: { factor: 236.588, abbr: 'mL' },
        liter: { factor: 0.236588, abbr: 'L' },
        uk_cup: { factor: 0.832674, abbr: 'UK cup' },
        uk_tablespoon: { factor: 13.3228, abbr: 'UK tbsp' },
        uk_teaspoon: { factor: 39.9683, abbr: 'UK tsp' }
    },
    luminous_intensity: {
        candela: { factor: 1, abbr: 'cd' },
        candlepower: { factor: 0.981, abbr: 'cp' },
        hefnerkerze: { factor: 0.920, abbr: 'HK' },
        lumen_per_steradian: { factor: 1, abbr: 'lm/sr' }
    }
    torque: {
        newton_meter: { factor: 1, abbr: 'N·m' },
        foot_pound: { factor: 0.737562, abbr: 'ft·lb' },
        inch_pound: { factor: 8.85074, abbr: 'in·lb' },
        kilogram_meter: { factor: 0.101972, abbr: 'kg·m' },
        dyne_centimeter: { factor: 1e7, abbr: 'dyn·cm' }
    },
    moment_of_inertia: {
        kilogram_square_meter: { factor: 1, abbr: 'kg·m²' },
        gram_square_centimeter: { factor: 1e7, abbr: 'g·cm²' },
        pound_square_foot: { factor: 23.7304, abbr: 'lb·ft²' },
        ounce_square_inch: { factor: 5459.58, abbr: 'oz·in²' },
        slug_square_foot: { factor: 0.737562, abbr: 'slug·ft²' }
    },
    frequency: {
        hertz: { factor: 1, abbr: 'Hz' },
        kilohertz: { factor: 0.001, abbr: 'kHz' },
        megahertz: { factor: 1e-6, abbr: 'MHz' },
        gigahertz: { factor: 1e-9, abbr: 'GHz' },
        cycles_per_second: { factor: 1, abbr: 'cps' },
        radians_per_second: { factor: 0.159155, abbr: 'rad/s' }
    },
    magnetic_field_strength: {
        ampere_per_meter: { factor: 1, abbr: 'A/m' },
        oersted: { factor: 0.0795775, abbr: 'Oe' },
        gauss: { factor: 0.0795775, abbr: 'G' },
        tesla: { factor: 7.95775e-4, abbr: 'T' }
    },
    radiation: {
        gray: { factor: 1, abbr: 'Gy' },
        rad: { factor: 100, abbr: 'rad' },
        sievert: { factor: 1, abbr: 'Sv' },
        rem: { factor: 100, abbr: 'rem' },
        roentgen: { factor: 114.9425, abbr: 'R' }
    },
    viscosity: {
        pascal_second: { factor: 1, abbr: 'Pa·s' },
        poise: { factor: 10, abbr: 'P' },
        centipoise: { factor: 1000, abbr: 'cP' },
        pound_per_foot_hour: { factor: 2419.09, abbr: 'lb/(ft·h)' },
        pound_per_foot_second: { factor: 0.671969, abbr: 'lb/(ft·s)' }
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
    fuel_consumption: "Fuel consumption measures the efficiency of a vehicle in terms of the amount of fuel used per unit distance traveled. Common units include miles per gallon (mpg), kilometers per liter (km/L), and liters per 100 kilometers (L/100km). This measure is crucial for comparing vehicle efficiency and estimating fuel costs for trips.",
    cooking: "Cooking measurements are used in recipes to specify ingredient quantities. They can vary between countries, with notable differences between US and UK systems. Common units include cups, tablespoons, teaspoons, and metric units like milliliters. Accurate conversion between these units is crucial for successful recipe adaptation across different measurement systems.",
    luminous_intensity: "Luminous intensity is a measure of the wavelength-weighted power emitted by a light source in a particular direction per unit solid angle. The SI unit of luminous intensity is the candela (cd). Other units include candlepower and hefnerkerze. This measure is important in lighting design, photography, and optical engineering."
    torque: "Torque is a measure of the rotational force applied to an object, such as a bolt or a shaft. It is calculated as the product of force and the perpendicular distance from the axis of rotation. Common units include newton-meters (N·m) and foot-pounds (ft·lb). Torque is crucial in engineering, particularly in automotive and mechanical applications.",
    moment_of_inertia: "Moment of inertia is a measure of an object's resistance to rotational acceleration. It depends on the object's mass distribution relative to its axis of rotation. The SI unit is kilogram-square meter (kg·m²). This property is important in physics and engineering, particularly in the design of rotating machinery and structures.",
    frequency: "Frequency is the number of occurrences of a repeating event per unit of time. In physics and engineering, it often refers to the number of cycles of a wave in one second. The SI unit is hertz (Hz). Frequency is a crucial concept in many fields, including acoustics, electronics, and telecommunications.",
    magnetic_field_strength: "Magnetic field strength, also known as magnetic field intensity, is a measure of the intensity of a magnetic field. The SI unit is ampere per meter (A/m). Other units include oersted and gauss. This property is important in electromagnetism, particularly in the design of electric motors, generators, and transformers.",
    radiation: "Radiation in this context refers to ionizing radiation, which is radiation that carries enough energy to liberate electrons from atoms or molecules. The SI unit for absorbed dose is the gray (Gy), while the sievert (Sv) is used for equivalent dose. These measurements are crucial in nuclear physics, radiation protection, and medical applications.",
    viscosity: "Viscosity is a measure of a fluid's resistance to flow. It describes the internal friction of a moving fluid. The SI unit is the pascal-second (Pa·s), while poise is a common CGS unit. Viscosity is a critical property in fluid dynamics, affecting everything from blood flow in biology to oil performance in engines."
   };



function convert(value, fromUnit, toUnit, category) {
    const fromFactor = conversionFactors[category][fromUnit].factor;
    const toFactor = conversionFactors[category][toUnit].factor;
    return value * (fromFactor / toFactor);
}

// Função para atualizar as opções de unidades
function updateUnitOptions(category) {
    const unitSelectFrom = document.getElementById('unit-from');
    const unitSelectTo = document.getElementById('unit-to');
    unitSelectFrom.innerHTML = '';
    unitSelectTo.innerHTML = '';

    for (const unit in conversionFactors[category]) {
        const optionFrom = document.createElement('option');
        optionFrom.value = unit;
        optionFrom.textContent = conversionFactors[category][unit].abbr;
        unitSelectFrom.appendChild(optionFrom);

        const optionTo = document.createElement('option');
        optionTo.value = unit;
        optionTo.textContent = conversionFactors[category][unit].abbr;
        unitSelectTo.appendChild(optionTo);
    }
}

// Event Handlers
document.getElementById('category-select').addEventListener('change', function() {
    const selectedCategory = this.value;
    updateUnitOptions(selectedCategory);
    // Atualizar a descrição da categoria
    document.getElementById('category-description').textContent = unitDescriptions[selectedCategory];
});

document.getElementById('convert-button').addEventListener('click', function() {
    const value = parseFloat(document.getElementById('value').value);
    const fromUnit = document.getElementById('unit-from').value;
    const toUnit = document.getElementById('unit-to').value;
    const category = document.getElementById('category-select').value;
    
    if (isNaN(value)) {
        document.getElementById('result').textContent = "Please enter a valid number.";
        return;
    }

    const result = convert(value, fromUnit, toUnit, category);
    document.getElementById('result').textContent = result;
});

// Inicializar a página com a primeira categoria selecionada
window.addEventListener('DOMContentLoaded', function() {
    const initialCategory = document.getElementById('category-select').value;
    updateUnitOptions(initialCategory);
    document.getElementById('category-description').textContent = unitDescriptions[initialCategory];
});
