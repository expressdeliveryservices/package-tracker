class Package {
    constructor(trackingNumber, sender, receiver, statusStages, location) {
        this.trackingNumber = trackingNumber;
        this.sender = sender;
        this.receiver = receiver;
        this.statusStages = statusStages;
        this.currentStage = 0;
        this.location = location;
    }
}