import {Component, Input} from '@angular/core';

/**
 * This class represents the navigation bar component.
 */
@Component({
  moduleId: module.id,
  selector: 'test-comp',
  templateUrl: 'test.component.html',
  styleUrls: ['test.component.css'],
})
export class TestComponent {
  @Input() styleProperty: number;
  @Input() testDataObject: Object;
}
