import getAdquiredUsers from "./fdps/adquired_users";
import getLeftUsers from "./fdps/left_users"; // nuevo
import getMeanGames from "./fdps/mean_games";
import getMeanRounds from "./fdps/mean_rounds";
import usersWhoLeftByAds from "./fdps/users_who_left_by_ads";
import getUsersWhoPlayed from "./fdps/users_who_played";

export class Simulation {
  private currentTime: number = 1;
  private deltaTime: number = 1;

  private users: number = 25000;
  private benefits: number = 0;

  constructor(private totalTime: number, private adsBetweenRounds: number, private partnerNumber: number) { }

  run() {
    for (let step = 0; step < this.totalTime; step++) {
      this.update();
      const progress = this.currentTime / this.totalTime * 100;
      if (progress % 10 === 0) {
        console.log(`Progress: ${progress}%`);
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
    return getUsersWhoPlayed(this.dayOfYear(), this.users);
  }

  private updateLeftUsersByAds(usersWhoPlayed: number): number {
    const usersWhoLeft = usersWhoLeftByAds(usersWhoPlayed, this.adsBetweenRounds);
    this.users -= usersWhoLeft;
    return usersWhoLeft;
  }

  private calculateBenefits(usersWhoPlayedAndDontLeft: number) {
    const shownAdsByUser = getMeanGames(usersWhoPlayedAndDontLeft) * getMeanRounds();
    const successFactor = 1 - this.partnerError();
    this.benefits += shownAdsByUser / 1000 * this.partnerEcpm() * successFactor;
  }

  private partnerEcpm() {
    switch (this.partnerNumber) {
      case 1:
        return 4 + Math.random() * (4.5 - 4);
      case 2:
        return 5.25 + Math.random() * (5.5 - 5.25);
      default:
        throw new Error("Invalid partner number");
    }
  }

  private partnerError() {
    switch (this.partnerNumber) {
      case 1:
        return 0.02 + Math.random() * (0.03 - 0.02);
      case 2:
        return 0.04 + Math.random() * (0.05 - 0.04);
      default:
        throw new Error("Invalid partner number");
    }
  }

  private printResults() {
    console.log(`Total time: ${this.totalTime}`);
    console.log(`Total users: ${this.users}`);
    console.log(`Total benefits / month: ${this.benefits / this.currentTime * 30}`);
  }

  private dayOfYear() {
    return this.currentTime % 365;
  }
}
