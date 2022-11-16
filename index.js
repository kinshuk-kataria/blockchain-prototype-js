import bcrypt from 'bcrypt';

class Block {
  constructor(blockId, previousHash, data) {
    this.blockId = blockId;
    this.timeStamp = Date.now();
    this.blockHash = this.getHash();
    this.prevHash = previousHash;
    this.data = data;
  }

  getHash() {
    return bcrypt.hashSync(
      String(
        this.blockId +
          this.timeStamp +
          this.blockHash +
          this.previousHash +
          JSON.stringify(this.data)
      ),
      10
    );
  }
}

class BlockChain {
  constructor() {
    this.chain = [];
  }

  addBlock(data) {
    let blockId = this.chain.length;
    let previousHash =
      this.chain.length !== 0
        ? this.chain[this.chain.length - 1].blockHash
        : '';
    let block = new Block(blockId, previousHash, data);
    this.chain.push(block);
  }
}

const MyFirstBlockChain = new BlockChain();

MyFirstBlockChain.addBlock({
  sender: 'Kinshuk',
  reciever: 'Sachin',
  amount: 3330000000
});
MyFirstBlockChain.addBlock({
  sender: 'Satoshi',
  reciever: 'Kataria',
  amount: 3210000000
});
MyFirstBlockChain.addBlock({
  sender: 'Kinshuk',
  reciever: 'Bill',
  amount: 3210000000
});

console.log(JSON.stringify(MyFirstBlockChain, null, 6));
