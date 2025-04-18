{
  function rollDice(count, sides) {
    if (sides < 1) throw new Error("Dice must have at least 1 side.");
        const numDice = count !== null ? count : 1;
        const diceStr = `d${sides}`;
        let total = 0;
        let allRolls = [];
  
        for (let i = 0; i < numDice; i++) {
          const roll = rollSingleDice(sides);
          total += roll;
          allRolls.push({ dice: diceStr, result: roll });
        }
  
        return {
          result: total,
          rolls: allRolls
        };
  }
  function rollSingleDice(sides) {
    return Math.floor(Math.random() * sides) + 1;
  }

  function mergeResults(first, rest) {
    return rest.reduce(
      (acc, { operator, nextOperand }) => {
        acc.result += getSign(operator) * nextOperand.result;
        acc.rolls.push(...nextOperand.rolls);
        return acc;
      },
      first
    );
  }

  function getSign(operator) {
    if (operator === "+") return 1;
    if (operator === "-") return -1;
    throw new Error(`Invalid operator: ${operator}`);
  }

  function validateOperand(operand) {
    if (operand === undefined || Number.isNaN(operand.result)) {
      throw new Error('Invalid operand');
    }
  }
}
  
  start
    = expression
  
  expression
    = firstOperand:operand rest:expressionRest* {
      return mergeResults(firstOperand, rest);
    }

  expressionRest
    = _ operator:operator _ nextOperand:operand {
      validateOperand(nextOperand);
      return { operator, nextOperand };
    }
  
  operator
    = operator:("+" / "-") { return operator; }
  
  operand
    = diceExpression
    / constant
  
  diceExpression
    = count:integer? "d" sides:integer {
        return rollDice(count, sides);
      }
  
  constant
    = integer:integer {
        return {
          result: integer,
          rolls: []
        };
      }
  
  integer
    = digits:[0-9]+ { return parseInt(digits.join(""), 10); }
  
  _ = [ \t\n\r]*
  