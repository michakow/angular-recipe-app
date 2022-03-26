const utils = {
  getUsername() {
    // complicated logic
    console.log('doing');
    return 'username';
  },
};

function uppercaseUsername(startAt?: number, stopBefore?: number) {
  const username = utils.getUsername();

  if (startAt === undefined || stop === undefined) {
    return username.toUpperCase();
  } else {
    return username.substring(startAt, stopBefore).toUpperCase();
  }
}

describe('example', () => {
  it('do something', () => {
    jest.spyOn(utils, 'getUsername').mockReturnValue('kamil');

    const result = uppercaseUsername();

    console.log(result);

    expect(result).toBe('KAMIL');
    expect(utils.getUsername).toHaveBeenCalled();
  });
});
