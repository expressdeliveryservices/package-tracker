// script.js
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
        <div><label>Tracking Number:</label> <span>${escapeHtml(shipment.tracking_number)}</span></div>
        <div><label>Sender:</label> <span>${escapeHtml(shipment.sender)}</span></div>
        <div><label>Receiver:</label> <span>${escapeHtml(shipment.receiver)}</span></div>
        <div><label>Status:</label> <span>${escapeHtml(shipment.status)}</span></div>
        <div><label>Origin:</label> <span>${escapeHtml(shipment.origin)}</span></div>
        <div><label>Destination:</label> <span>${escapeHtml(shipment.destination)}</span></div>
        <div><label>Expected Delivery:</label> <span>${escapeHtml(shipment.expected_delivery)}</span></div>
        <div><label>Note:</label> <span>${escapeHtml(shipment.extended_description)}</span></div>
      </div>
      <div class="section-title">Payment Details</div>
      <div class="details">
        <div><label>Payment Mode:</label> <span>${escapeHtml(shipment.payment_mode || 'N/A')}</span></div>
        <div><label>Amount:</label> <span>$${parseFloat(shipment.amount || 0).toFixed(2)}</span></div>
        ${shipment.payment_mode === 'Online' ? `<div><label>Payment Receipt:</label> <img src="/assets/IMG_1860.jpeg" alt="Payment Icon" class="payment-img"></div>` : ''}
      </div>
      <div class="section-title">Location Details</div>
      <div class="details">
        <div><label>Address:</label> <span>${escapeHtml(shipment.location?.address || 'N/A')}</span></div>
        <div><label>Latitude:</label> <span>${shipment.location?.lat || 'N/A'}</span></div>
        <div><label>Longitude:</label> <span>${shipment.location?.lng || 'N/A'}</span></div>
      </div>
      <div class="section-title">Authorization</div>
      <div class="details">
        ${shipment.official_stamp ? `<div><label>Official Stamp:</label> <img src="${escapeHtml(shipment.official_stamp)}" alt="Official Stamp" class="signature-img"></div>` : '<div><label>Official Stamp:</label> <span>Not Available</span></div>'}
      </div>
      <div class="total">Total: $${parseFloat(shipment.amount || 0).toFixed(2)}</div>
      <div class="footer">
        Express Delivery Service | Phone: +1 (941) 207-8626 | Email: Expressdeliveryservice0016@gmail.com<br>
        Issued: ${issueDate}
      </div>
    </div>
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

async function downloadInvoice(trackingNumber) {
  try {
    const response = await fetch('/assets/shipments.json');
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const shipments = await response.json();
    const pkg = shipments.find(s => (s.tracking_number || '').toString().toUpperCase() === trackingNumber.toUpperCase());

    if (!pkg) {
      alert('No shipment found for this tracking number.');
      return;
    }
    if (!isValidShipment(pkg)) {
      alert('Invalid shipment data. Please check the tracking number or contact support.');
      return;
    }

    // Preload images to ensure they render in the PDF
    const images = [
      '/assets/IMG_1855.jpeg',
      '/assets/IMG_1860.jpeg',
      pkg.official_stamp || ''
    ].filter(url => url);
    await Promise.all(images.map(src => {
      return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = src;
        img.onload = resolve;
        img.onerror = () => {
          console.warn(`Failed to load image: ${src}`);
          resolve();
        };
      });
    }));

    // Create temporary container for receipt
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.innerHTML = generateReceiptContent(pkg);
    document.body.appendChild(tempContainer);

    // Ensure DOM is rendered
    await new Promise(resolve => setTimeout(resolve, 100));

    const receiptElement = tempContainer.querySelector('.receipt');
    if (!receiptElement) {
      console.error('Receipt element not found.');
      alert('Error generating receipt.');
      document.body.removeChild(tempContainer);
      return;
    }

    const pdfFilename = `Receipt-${pkg.tracking_number}.pdf`;
    const opt = {
      margin: [2, 2, 2, 2],
      filename: pdfFilename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        logging: true,
        backgroundColor: '#ffffff'
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf()
      .set(opt)
      .from(receiptElement)
      .toPdf()
      .get('pdf')
      .then(async (pdf) => {
        document.body.removeChild(tempContainer);
        const blob = pdf.output('blob');
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = pdfFilename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        // Attempt to share PDF
        if (navigator.share && navigator.canShare && navigator.canShare({ files: [new File([blob], pdfFilename, { type: 'application/pdf' })] })) {
          try {
            await navigator.share({
              title: `Receipt for Tracking Number ${pkg.tracking_number}`,
              text: `Here is the receipt for your shipment with tracking number ${pkg.tracking_number}.`,
              files: [new File([blob], pdfFilename, { type: 'application/pdf' })]
            });
            console.log('Receipt shared successfully');
          } catch (err) {
            console.warn('Sharing failed:', err);
            alert('Receipt downloaded. Sharing not supported; please share the file manually.');
          }
        } else {
          console.log('Web Share API not supported.');
          alert('Receipt downloaded. Please share the file manually from your downloads folder.');
        }
      })
      .catch(err => {
        console.error('PDF generation error:', err);
        alert('Error generating PDF. Please try again or contact support.');
        document.body.removeChild(tempContainer);
      });
  } catch (err) {
    console.error('Error in downloadInvoice:', err);
    alert('Error processing receipt. Please try again or contact support.');
  }
}

async function printInvoice(trackingNumber) {
  try {
    const response = await fetch('/assets/shipments.json');
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const shipments = await response.json();
    const pkg = shipments.find(s => (s.tracking_number || '').toString().toUpperCase() === trackingNumber.toUpperCase());

    if (!pkg) {
      alert('No shipment found for this tracking number.');
      return;
    }
    if (!isValidShipment(pkg)) {
      alert('Invalid shipment data. Please check the tracking number or contact support.');
      return;
    }

    // Create temporary container for printing
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Receipt - ${pkg.tracking_number}</title>
        </head>
        <body>
          ${generateReceiptContent(pkg)}
          <script>
            window.onload = function() {
              window.print();
              window.onafterprint = function() { window.close(); };
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  } catch (err) {
    console.error('Error in printInvoice:', err);
    alert('Error processing receipt. Please try again or contact support.');
  }
}

function isValidShipment(shipment) {
  const requiredFields = [
    'tracking_number', 'sender', 'receiver', 'status', 'origin',
    'destination', 'expected_delivery', 'extended_description'
  ];
  const missingFields = requiredFields.filter(field => {
    const value = shipment[field];
    return value === undefined || value === null || value === '' || value === 'N/A';
  });
  if (missingFields.length > 0) {
    console.warn(`Validation failed for shipment: Missing fields: ${missingFields.join(', ')}`);
    return false;
  }
  return true;
}
