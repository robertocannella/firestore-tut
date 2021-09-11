import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TypeScriptHighlight } from './text-parse';

@Component({
  selector: 'app-code-block',
  templateUrl: './code-block.component.html',
  styleUrls: ['./code-block.component.css'],
  encapsulation: ViewEncapsulation.None,  //added to allow for custome styles
})
export class CodeBlockComponent implements OnInit {

  constructor() { }
  codeUrl = './code-block.component.css';
  languages = ['typescript']
  text = new TypeScriptHighlight();

  code = this.text.html;
  ngOnInit(): void {
  }

}
