class Failures {
  constructor(value) {
    this.value = value;
  }

  isSuccess() {
    return false;
  }

  append(e) {
    if (!e.isSuccess()) {
      this.value.push(...e.value);
    }
    return this;
  }

  getSuccesses() {
    return [];
  }

  getFailures() {
    return this.value;
  }

  static of(value) {
    return new Failures(value);
  }
}

class Successes {
  constructor(value) {
    this.value = value;
  }

  isSuccess() {
    return true;
  }

  append(e) {
    if (!e.isSuccess()) {
      return e;
    }
    this.value.push(...e.value);
    return this;
  }

  getSuccesses() {
    return this.value;
  }

  getFailures() {
    return [];
  }

  static of(value) {
    return new Successes(value);
  }
}

module.exports = {
  Successes,
  Failures,
};
