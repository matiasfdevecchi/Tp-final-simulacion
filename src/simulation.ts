export class Simulation {
  private currentTime: number = 0;
  private deltaTime: number = 1;
  
  private users: number = 25000;
  private benefits: number = 0;

  constructor(private totalTime: number, private adsByGame: number) {}

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
    this.updateLeftUsersByAds(usersWhoPlayed);
    this.calculateBenefits(usersWhoPlayed);
  }

  private updateAdquiredUsers() {
    const adquiredUsers = Math.floor(Math.random() * 1000);
    this.users += adquiredUsers;
  }

  private updateLeftUsers() {
    const leftUsers = Math.floor(Math.random() * 5000);
    this.users -= leftUsers;
    if (this.users < 0) {
      this.users = 0;
    }
  }

  private getUsersWhoPlayed() {
    const users = Math.floor(this.users * Math.random());
    return users > 0 ? users : 0;
  }

  private updateLeftUsersByAds(usersWhoPlayed: number) {
    this.users -= Math.floor(usersWhoPlayed * this.adsByGame * Math.random());
    if (this.users < 0) {
      this.users = 0;
    }
  }

  private calculateBenefits(usersWhoPlayed: number) {
    this.benefits += usersWhoPlayed * Math.random();
  }

  private printResults() {
    console.log(`Total time: ${this.totalTime}`);
    console.log(`Total users: ${this.users}`);
    console.log(`Total benefits: ${this.benefits}`);
  }
}
