import Bowman from '../Bowman'
import Daemon from '../Daemon'
import Magician from '../Magician'
import Swordsman from '../Swordsman'
import Undead from '../Undead'
import Zombie from '../Zombie'
import Character from '../Character'

test.each([
  ['Персонаж', Character, ['ЗомбиПерс', 'Zombie'], {
    "name": "ЗомбиПерс",
    "type": "Zombie",
    "health": 100,
    "level": 1,
    "attack": null,
    "defence": null
  }],
  ['Лучник', Bowman, ['Лучник', 'Bowman'], {
    "name": "Лучник",
    "type": "Bowman",
    "health": 100,
    "level": 1,
    "attack": 25,
    "defence": 25
  }],
  ['Демон', Daemon, ['Демон', 'Daemon'], {
    "name": "Демон",
    "type": "Daemon",
    "health": 100,
    "level": 1,
    "attack": 10,
    "defence": 40
  }],
  ['Мечник', Swordsman, ['Мечник', 'Swordsman'], {
    "name": "Мечник",
    "type": "Swordsman",
    "health": 100,
    "level": 1,
    "attack": 40,
    "defence": 10
  }],
  ['Маг', Magician, ['Маг', 'Magician'], {
    "name": "Маг",
    "type": "Magician",
    "health": 100,
    "level": 1,
    "attack": 10,
    "defence": 40
  }],
  ['Мертвец', Undead, ['Мертвец', 'Undead'], {
    "name": "Мертвец",
    "type": "Undead",
    "health": 100,
    "level": 1,
    "attack": 25,
    "defence": 25
  }],
  ['Зомби', Zombie, ['Зомби', 'Zombie'], {
    "name": "Зомби",
    "type": "Zombie",
    "health": 100,
    "level": 1,
    "attack": 40,
    "defence": 10
  }],

])('check new object %s', (name, MyObj, params, state) => {
    const obj = new MyObj(...params);

    expect(obj.name).toBe(state.name);
    expect(obj.type).toBe(state.type);
    expect(obj.health).toBe(state.health);
    expect(obj.level).toBe(state.level);
    expect(obj.attack).toBe(state.attack);
    expect(obj.defence).toBe(state.defence);
  });

  describe('Character constructor', () => {
    test('check throw if name is not string', () => {
      expect(() => new Character(123, 'Bowman')).toThrow('name должен быть string');
    });
  
    test('check throw if name length is less than 2', () => {
      expect(() => new Character('A', 'Bowman')).toThrow('name должен быть длиной от 2 до 10 символов');
    });
  
    test('check throw if name length is more than 10', () => {
      expect(() => new Character('VeryLongName', 'Bowman')).toThrow('name должен быть длиной от 2 до 10 символов');
    });
  
    test('check throw if type is not one of the allowed types', () => {
      expect(() => new Character('Character', 'InvalidType')).toThrow('type должен быть одним из разрешенных типов');
    });
  });

  describe('Character', () => {
    describe('levelUp', () => {
      test('cherck throw an error if character health is 0', () => {
        const character = new Bowman('Лучник', 'Bowman');
        character.health = 0;
        expect(() => character.levelUp()).toThrow('Нельзя повысить левел умершего');
      });
  
      test('check increase character level, attack, defence and reset health', () => {
        const character = new Bowman('Лучник', 'Bowman');
        character.health = 33;
        character.levelUp();
        expect(character.level).toBe(2);
        expect(character.attack).toBe(30);
        expect(character.defence).toBe(30);
        expect(character.health).toBe(100);
      });
    });
  
    describe('damage', () => {
      test('check decrease character health', () => {
        const character = new Bowman('Лучник', 'Bowman');
        character.damage(20);
        expect(character.health).toBeCloseTo(85); // health - 20 * (1 - 25 / 100) = 85
      });
  
      test('check not decrease character health', () => {
        const character = new Bowman('Лучник', 'Bowman');
        character.health = -10;
        character.damage(20);
        expect(character.health).toBe(-10); // health not decrease -10
      });
  
      test('check decrease character health if dead', () => {
        const character = new Bowman('Лучник', 'Bowman');
        character.health = 10
        character.damage(20); // health - 20 * (1 - 25 / 100) = -5
        expect(character.health).toBe(-5);
      });
    });
  });