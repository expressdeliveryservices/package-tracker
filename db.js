const packages = [
    new Package('EXP12345','John Doe','Jane Smith',['WE HAVE YOUR PACKAGE','ON THE WAY','OUT FOR DELIVERY','TO 123 Main St, NYC'],{lat:40.7532,lng:-73.9496}),
    new Package('EXP67890','Alice Brown','Bob White',['WE HAVE YOUR PACKAGE','ON THE WAY','OUT FOR DELIVERY','TO 456 Elm St, NYC'],{lat:40.7496,lng:-73.9910})
];

function getPackage(trackingNumber){
    return packages.find(pkg => pkg.trackingNumber === trackingNumber);
}
