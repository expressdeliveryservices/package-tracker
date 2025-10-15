// tracking.js (or script.js)
function generateReceiptContent(shipment) {
  const issueDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  return `
    <style>
      body {
        font-family: 'Times New Roman', Times, serif;
        margin: 2mm;
        background: #ffffff;
      }
      .receipt {
        width: 70mm;
        margin: 0 auto;
        padding: 2mm;
        border: 1px solid #000;
        background: #ffffff;
        position: relative;
      }
      .watermark {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(-45deg);
        color: #a9a9a9;
        font-size: 16px;
        font-weight: bold;
        opacity: 0.4;
        z-index: 0;
      }
      .header {
        font-size: 10px;
        font-weight: bold;
        margin-bottom: 2px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .company-name {
        font-size: 10px;
        font-weight: bold;
      }
      .logo img {
        height: 25px;
        width: auto;
      }
      .section-title {
        font-size: 9px;
        font-weight: bold;
        margin: 2px 0;
        padding-bottom: 1px;
        border-bottom: 1px solid #000;
      }
      .details {
        font-size: 7px;
        margin: 2px 0;
        line-height: 1.2;
        letter-spacing: 0.5px;
        padding: 3px;
        border: 1px solid #ddd;
      }
      .details label {
        font-weight: bold;
        width: 90px;
        display: inline-block;
        vertical-align: top;
      }
      .details img {
        max-width: 50px;
        height: auto;
        margin-top: 2px;
      }
      .total {
        font-size: 9px;
        font-weight: bold;
        margin-top: 5px;
        padding-top: 2px;
        text-align: right;
      }
      .footer {
        font-size: 5px;
        text-align: center;
        margin-top: 5px;
        color: #555;
      }
      @media print {
        body {
          margin: 0;
        }
        .receipt {
          border: 1px solid #000;
        }
      }
    </style>
    <div class="receipt">
      <div class="watermark">CERTIFIED TRUE COPY</div>
      <div class="header">
        <div class="company-name">Express Delivery Service</div>
        <div class="logo">
          <img src="/assets/IMG_1855.jpeg" alt="Company Logo">
        </div>
      </div>
      <div class="section-title">Shipment Details</div>
      <div class="details">
        <div><label>Tracking Number:</label> <span>${escapeHtml(shipment.trackingNumber)}</span></div>
        <div><label>Order ID:</label> <span>${escapeHtml(shipment.orderId)}</span></div>
        <div><label>Content:</label> <span>${escapeHtml(shipment.content)}</span></div>
        <div><label>Origin:</label> <span>${escapeHtml(shipment.origin)}</span></div>
        <div><label>Destination:</label> <span>${escapeHtml(shipment.destination)}</span></div>
        <div><label>Est. Delivery:</label> <span>${escapeHtml(shipment.estDeliveryDate)}</span></div>
        <div><label>Transport Mode:</label> <span>${escapeHtml(shipment.modeOfTransport)}</span></div>
        <div><label>Shipment Type:</label> <span>${escapeHtml(shipment.typeOfShipment)}</span></div>
        <div><label>Quantity:</label> <span>${escapeHtml(shipment.quantity)}</span></div>
      </div>
      <div class="section-title">Payment Details</div>
      <div class="details">
        <div><label>Payment Mode:</label> <span>${escapeHtml(shipment.paymentMode)}</span></div>
        <div><label>Amount:</label> <span>$${parseFloat(shipment.receipt.amount).toFixed(2)}</span></div>
        ${shipment.paymentMode === 'Online' ? `<div><label>Payment Receipt:</label> <img src="/assets/IMG_1860.jpeg" alt="Payment Icon" class="payment-img"></div>` : ''}
      </div>
      <div class="section-title">Sender Details</div>
      <div class="details">
        <div><label>Name:</label> <span>${escapeHtml(shipment.sender.name)}</span></div>
        <div><label>Address:</label> <span>${escapeHtml(shipment.sender.address)}</span></div>
      </div>
      <div class="section-title">Receiver Details</div>
      <div class="details">
        <div><label>Name:</label> <span>${escapeHtml(shipment.receiver.name)}</span></div>
        <div><label>Address:</label> <span>${escapeHtml(shipment.receiver.address)}</span></div>
        <div><label>Mobile:</label> <span>${escapeHtml(shipment.receiver.mobile)}</span></div>
      </div>
      <div class="section-title">Authorization</div>
      <div class="details">
        ${shipment.officialStamp ? `<div><label>Official Stamp:</label> <img src="${escapeHtml(shipment.officialStamp)}" alt="Official Stamp" class="signature-img"></div>` : '<div><label>Official Stamp:</label> <span>Not Available</span></div>'}
      </div>
      <div class="total">Total: $${parseFloat(shipment.receipt.amount).toFixed(2)}</div>
      <div class="footer">
        Express Delivery Service | Phone: +1 (941) 207-8626 | Email: Expressdeliveryservice0016@gmail.com<br>
        Issued: ${issueDate}
      </div>
    </div>
  `;
}

// Escape HTML to prevent XSS
function escapeHtml(unsafe) {
  if (typeof unsafe !== 'string') return String(unsafe || '');
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
