import getAdquiredUsers from "./fdps/adquired_users";
import getLeftUsers from "./fdps/left_users"; // nuevo

export class Simulation {
  private currentTime: number = 1;
  private deltaTime: number = 1;

  private users: number = 25000;
  private benefits: number = 0;

  constructor(private totalTime: number, private adsBetweenRounds: number, private partnerNumber: number) { }

  run() {
    for (let step = 0; step < this.totalTime; step++) {
      this.update();
      if (step % 10000 === 0) {
        console.log("**********************************************");
        console.log(`Partial results at time: ${this.currentTime}`);
        this.printResults();
        console.log("**********************************************");
      }
      this.currentTime += this.deltaTime;
    }
    this.printResults();
  }

  update() {
    this.updateAdquiredUsers();
    this.updateLeftUsers();
    const usersWhoPlayed = this.getUsersWhoPlayed();
    const usersWhoLeftByAds = this.updateLeftUsersByAds(usersWhoPlayed);
    this.calculateBenefits(usersWhoPlayed - usersWhoLeftByAds);
  }

  private updateAdquiredUsers() {
    const adquiredUsers = getAdquiredUsers(this.dayOfYear());
    this.users += adquiredUsers;
  }

  private updateLeftUsers() {
    const leftUsers = getLeftUsers(this.users);
    this.users -= leftUsers;
    if (this.users < 0) {
      this.users = 0;
    }
  }

  private getUsersWhoPlayed() {
    const users = Math.floor(this.users * Math.random());
    if (users > this.users) {
      return this.users;
    } else if (users < 0) {
      return 0;
    } else {
      return users;
    }
  }

  private updateLeftUsersByAds(usersWhoPlayed: number): number {
    let usersWhoLeft = Math.floor(usersWhoPlayed * this.adsBetweenRounds / this.roundMean() * Math.random());
    if (usersWhoLeft > usersWhoPlayed) {
      usersWhoLeft = usersWhoPlayed;
    }
    this.users -= usersWhoLeft;
    return usersWhoLeft;
  }

  private roundMean() {
    return 25;
  }

  private calculateBenefits(usersWhoPlayedAndDontLeft: number) {
    const noErrorPercentage = 1 - this.partnerError();
    this.benefits += usersWhoPlayedAndDontLeft / 1000 * this.partnerEcpm() * noErrorPercentage;
  }

  private partnerEcpm() {
    switch (this.partnerNumber) {
      case 1:
        return 6;
      case 2:
        return 5;
      default:
        throw new Error("Invalid partner number");
    }
  }

  private partnerError() {
    switch (this.partnerNumber) {
      case 1:
        return 0.05;
      case 2:
        return 0.06;
      default:
        throw new Error("Invalid partner number");
    }
  }

  private printResults() {
    console.log(`Total time: ${this.totalTime}`);
    console.log(`Total users: ${this.users}`);
    console.log(`Total benefits: ${this.benefits}`);
  }

  private dayOfYear() {
    return this.currentTime % 365;
  }
}
