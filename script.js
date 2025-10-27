// script.js (updated for backend)
function generateReceiptContent(shipment) {
  const companyName = shipment.receipt?.companyName || 'Express Delivery Service';
  const amount = shipment.receipt?.amount || '0.00';
  const signatureStamp = shipment.officialStamp || '';

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Receipt - ${escapeHtml(shipment.trackingNumber)}</title>
      <style>
        /* ... full receipt style from your script.js ... */
      </style>
    </head>
    <body>
      /* ... full receipt HTML from your script.js, using shipment fields ... */
    </body>
    </html>
  `;
}

function escapeHtml(unsafe) {
  if (typeof unsafe !== 'string') return String(unsafe || '');
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function isValidShipment(shipment) {
  const requiredFields = [
    'trackingNumber', 'orderId', 'content', 'origin', 'destination',
    'estDeliveryDate', 'modeOfTransport', 'typeOfShipment', 'quantity',
    'paymentMode', 'receipt.amount', 'sender.name', 'sender.address',
    'receiver.name', 'receiver.address', 'receiver.mobile'
  ];
  const missingFields = requiredFields.filter(field => {
    const keys = field.split('.');
    let value = shipment;
    for (const key of keys) {
      value = value ? value[key] : undefined;
    }
    return value === undefined || value === null || value === '' || value === 'N/A';
  });
  if (missingFields.length > 0) {
    console.warn(`Validation failed for shipment: Missing fields: ${missingFields.join(', ')}`);
    return false;
  }
  if (shipment.receiver.lat !== undefined && shipment.receiver.lng !== undefined) {
    const lat = parseFloat(shipment.receiver.lat);
    const lng = parseFloat(shipment.receiver.lng);
    if (isNaN(lat) || isNaN(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      console.warn(`Invalid coordinates: lat=${lat}, lng=${lng}`);
      return false;
    }
  }
  return true;
}

// ... (keep downloadInvoice and printInvoice as in your script.js, but update fetch to API_BASE_URL + /shipments/:number) ...