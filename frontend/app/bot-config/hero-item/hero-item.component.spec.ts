import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroItemComponent } from './hero-item.component';
import { By } from '@angular/platform-browser';

describe('HeroItemComponent', () => {
    let component: HeroItemComponent;
    let fixture: ComponentFixture<HeroItemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                HeroItemComponent,
            ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HeroItemComponent);
        component = fixture.componentInstance;
        component.hero = {
            id: 1,
            name: 'antimage',
            niceName: 'Anti-Mage',
            roles: 'Carry - Escape - Nuker',
            createdAt: '2018-07-19T18:50:42.000Z',
            updatedAt: '2018-07-19T18:50:42.000Z',
            heroStats: {
                id: 1,
                primaryAttribute: 'agi',
                ability_q: 'Mana Break',
                ability_w: 'Blink',
                ability_e: 'Spell Shield',
                ability_r: 'Mana Void',
                moveSpeed: 310,
                armor: 2.08,
                attackDamageMin: 29,
                attackDamageMax: 33,
                attackRate: null,
                attackRange: null,
                baseStrength: 23,
                baseStrengthGain: 1.3,
                baseAgility: 22,
                baseAgilityGain: 2.8,
                baseIntelligence: 12,
                baseIntelligenceGain: 1.8,
                heroId: 1,
                createdAt: '2018-07-19T18:53:35.000Z',
                updatedAt: '2018-07-19T18:53:35.000Z',
            },
            url: '/static/heroes/images/antimage.png',
            primaryAttribute: 'agi',
            ability_q: 'Mana Break',
            ability_w: 'Blink',
            ability_e: 'Spell Shield',
            ability_r: 'Mana Void',
            moveSpeed: 310,
            armor: 2.08,
            attackDamageMin: 29,
            attackDamageMax: 33,
            attackRate: null,
            attackRange: null,
            baseStrength: 23,
            baseStrengthGain: 1.3,
            baseAgility: 22,
            baseAgilityGain: 2.8,
            baseIntelligence: 12,
            baseIntelligenceGain: 1.8,
            url_q: '/static/abilities/images/antimage_q.png',
            url_w: '/static/abilities/images/antimage_w.png',
            url_e: '/static/abilities/images/antimage_e.png',
            url_r: '/static/abilities/images/antimage_r.png',
        };
        component.isSelectedHero = true;
        component.pool = 0;
        fixture.detectChanges();
    });

    it('should create', (done) => {
        expect(component).toBeTruthy();
        done();
    });

    it('should emit removeHero function on click remove icon click', (done) => {
        // create object to be emitted
        const hero = component.hero;
        const pool = component.pool;
        const emitObject = {
            hero,
            pool,
        };

        spyOn(component.removeHeroEmitter, 'emit');

        // trigger click to remove hero
        fixture.debugElement.query(By.css('#removeHeroIcon'))
            .triggerEventHandler('click', new MouseEvent('click'));
        fixture.detectChanges();
        expect(component.removeHeroEmitter.emit).toHaveBeenCalledWith(emitObject);
        done();
    });
});
