import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-abilities',
  templateUrl: './abilities.component.html',
  styleUrls: ['./abilities.component.scss']
})

export class AbilitiesComponent implements OnInit {

    numberOfPools: any;
    selectedPool: number;
    selectedPoolArray: any;
    abilityPrioArray: any;

    // Temporary test data
      tempTestData = [
        {
          name: 'Axe',
          class: 'Strength',
        }, {
          name: 'Sven',
          class: 'Strength',
        }, {
          name: 'Viper',
          class: 'Agility',
        }, {
          name: 'Sniper',
          class: 'Agility',
        }, {
          name: 'Lina',
          class: 'Intelligence',
        }, {
          name: 'Chen',
          class: 'Intelligence',
        },
      ];

  constructor() { }

  // hero category objects
    strengthHeroes = [];
    agilityHeroes = [];
    intelligenceHeroes = [];

    pool1 = [];
    pool2 = [];
    pool3 = [];
    pool4 = [];
    pool5 = [];

    

  ngOnInit() {
    this.numberOfPools = [1, 2, 3, 4, 5];
    this.selectedPool = 1;
    this.selectedPoolArray = this.pool1;
    this.getHeroes();
    console.log(this.abilityPrioArray);
    this.initAbilityPrioArray();
  }

  getHeroes(): void {
    // database call to retrieve all dota heroes
    // this.api.getAllHeroes().subscribe((data) => {
    //     this.allHeroes = data;
    //     this.sortHeroData();
    // });

    this.sortHeroData();
  }

  sortHeroData(): void {
    this.tempTestData.forEach((hero) => {
      if (hero.class === 'Strength') {
        this.strengthHeroes.push(hero);
      } else if (hero.class === 'Agility') {
        this.agilityHeroes.push(hero);
      } else if (hero.class === 'Intelligence') {
        this.intelligenceHeroes.push(hero);
      }
    });
  }

  // To Do: get API to gather data
  initAbilityPrioArray() {
      this.abilityPrioArray = [
          {
              name: 'Mist Coil',
              type: 'Q',
              src: 'https://d1u5p3l4wpay3k.cloudfront.net/dota2_gamepedia/c/ce/Mist_Coil_icon.png?version=32a1cebecf57f997259c1f5e12439d72',
          },
          {
              name: 'Aphotic Shield',
              type: 'W',
              src: 'https://d1u5p3l4wpay3k.cloudfront.net/dota2_gamepedia/b/b1/Aphotic_Shield_icon.png?version=336e58ce29e348dcc15084c630562a9e',
          },
          {
              name: 'Curse of Avernus',
              type: 'E',
              src: 'https://d1u5p3l4wpay3k.cloudfront.net/dota2_gamepedia/d/d2/Curse_of_Avernus_icon.png?version=8db283662c09832ae9c22806cce00436',
          },
          {
              name: 'Borrowed Time',
              type: 'R',
              src: 'https://d1u5p3l4wpay3k.cloudfront.net/dota2_gamepedia/7/78/Borrowed_Time_icon.png?version=849b71406c8c433ebb4f077b1516cd2b',
          },
      ];
  }

  prioritize(type, direction): void {
      console.log('yay');
      console.log(type);

      console.log('before');
      console.log(this.abilityPrioArray);
      for (var i = 0; i < this.abilityPrioArray.length; i += 1) {
          let ability = this.abilityPrioArray[i]
          if (ability.type === type) {
              
              let prevIndex, temp;
              if (direction >= 0) {
                  prevIndex = (i - 1) % this.abilityPrioArray.length;
                  // -1 % 4 == -1 ??!! wtf javascript
                  if (prevIndex == -1) prevIndex = 3;
                  temp = this.abilityPrioArray[prevIndex];
              }
              else {
                  prevIndex = (i + 1)% this.abilityPrioArray.length;
                  console.log(prevIndex);
                  temp = this.abilityPrioArray[prevIndex];
              }
              
              // this.abilityPrioArray.splice(prevIndex, 1);
              // this.abilityPrioArray.splice(i, 0, temp);
              // 
              this.abilityPrioArray[prevIndex] = this.abilityPrioArray[i];
              this.abilityPrioArray[i] = temp;
              break;
          }
      }
      console.log('After');
      console.log(this.abilityPrioArray);
  }

  levelArrayDescription(): string[] {
      let arr = [];
      for(let i = 0; i < 25; i += 1) {
          arr.push(`${i+1}`);
      }
      return arr;
  }



}
