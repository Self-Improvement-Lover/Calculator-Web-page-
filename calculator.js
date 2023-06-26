"use strict";

function Calculator() {
  this.total = 0;
  this.totalArr = [];
  this.arr = [];

  this.add = (value) => {
    this.total = this.total + value;
    this.arr.push(`ADD ${value}`);
    this.totalArr.push(this.total);
  };

  this.subtract = (value) => {
    this.total -= value;
    this.arr.push(`SUBTRACT ${value}`);
    this.totalArr.push(this.total);
  };

  this.multiply = (value) => {
    this.total *= value;
    this.arr.push(`MULTIPLY ${value}`);
    this.totalArr.push(this.total);
  };

  this.divide = (value) => {
    if (value === 0) {
      this.arr.push(`DIVIDE ${0}`);
      this.total = "ERROR";
      this.totalArr.push(this.total);
    } else {
      this.total /= value;
      this.arr.push(`DIVIDE ${value}`);
      this.totalArr.push(this.total);
    }
  };

  this.power = (value) => {
    this.total = Math.pow(this.total, value);
    this.arr.push(`POWER ${value}`);
    this.totalArr.push(this.total);
  };

  this.getTotal = () => {
    if (isNaN(this.total)) {
      return "ERROR";
    } else {
      this.arr.push(`GETTOTAL ${this.total}`);
      return this.total;
    }
  };

  this.clear = () => {
    this.total = 0;
    this.arr = [];
    this.totalArr = [];
  };

  this.getHistory = () => {
    return this.arr;
  };

  this.undo = () => {
    if (this.arr.length === 1 || this.arr.length === 0) {
      this.total = 0;
      this.arr.pop();
      this.totalArr.pop();
    } else {
      console.log(this.totalArr);
      this.total = this.totalArr[this.totalArr.length - 2];
      this.arr.pop();
      this.totalArr.pop();
    }
  };
}

module.exports = Calculator;
