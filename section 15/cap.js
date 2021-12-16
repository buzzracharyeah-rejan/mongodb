db.createCollection('cappedData', { capped: true, size: 10000, max: 3 });
