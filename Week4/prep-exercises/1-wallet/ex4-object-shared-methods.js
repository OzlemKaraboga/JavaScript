import eurosFormatter from './euroFormatter.js';

function deposit(amount) {
  this._cash += amount;
}

function withdraw(amount) {
  if (this._cash - amount < 0) {
    console.log(`Insufficient funds!`);
    return 0;
  }

  this._cash -= amount;
  return amount;
}

function transferInto(wallet, amount) {
  console.log(
    `Transferring ${eurosFormatter.format(amount)} from ${
      this._name
    } to ${wallet.getName()}`
  );
  const withdrawnAmount = this.withdraw(amount);
  wallet.deposit(withdrawnAmount);
}

function reportBalance() {
  console.log(
    `Name: ${this._name}, balance: ${eurosFormatter.format(this._cash)}`
  );
}

function getName() {
  return this._name;
}

function createWallet(name, cash = 0, dailyAllowance = 40) {
  let dayTotalWithdrawals = 0;

  return {
    _name: name,
    _cash: cash,
    _dailyAllowance: dailyAllowance,

    deposit,
    withdraw: function (amount) {
      if (this._cash - amount < 0) {
        console.log(`Insufficient funds!`);
        return 0;
      }

      if (dayTotalWithdrawals + amount > this._dailyAllowance) {
        console.log(`Insufficient remaining daily allowance!`);
        return 0;
      }

      this._cash -= amount;
      dayTotalWithdrawals += amount;
      return amount;
    },
    transferInto,
    reportBalance,
    getName,
    setDailyAllowance: function (newAllowance) {
      this._dailyAllowance = newAllowance;
      console.log(`Daily allowance set to: ${eurosFormatter.format(newAllowance)}`);
    },
    resetDailyAllowance: function () {
      dayTotalWithdrawals = 0;
    },
  };
}

function main() {
  const walletJack = createWallet('Jack', 100);
  const walletJoe = createWallet('Joe', 10);
  const walletJane = createWallet('Jane', 20);

  walletJack.transferInto(walletJoe, 50);
  walletJane.transferInto(walletJoe, 25);

  walletJane.deposit(20);
  walletJane.transferInto(walletJoe, 25);

  walletJack.reportBalance();
  walletJoe.reportBalance();
  walletJane.reportBalance();
}

main();