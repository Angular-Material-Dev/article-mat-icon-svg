import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";
import { MatIconModule, MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

const THUMBUP_ICON =
  `
  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.` +
  `44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5` +
  `1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z"/>
  </svg>
`;

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="container">
      <h2>Font Icon</h2>
      <mat-icon
        aria-hidden="false"
        aria-label="Example home icon"
        fontIcon="home"
      ></mat-icon>
      <h2>String literal of SVG icon</h2>
      <mat-icon
        svgIcon="thumbs-up"
        aria-hidden="false"
        aria-label="Example thumbs up SVG icon"
      ></mat-icon>
      <h2>Icon from single SVG file</h2>
      <mat-icon
        svgIcon="face"
        aria-hidden="false"
        aria-label="Example face SVG icon"
      ></mat-icon>
      <h2>Multiple icons from SVG sprite file</h2>
      <mat-icon
        svgIcon="search"
        aria-hidden="false"
        aria-label="Example search SVG icon"
      ></mat-icon>
      <mat-icon
        svgIcon="settings"
        aria-hidden="false"
        aria-label="Example settings SVG icon"
      ></mat-icon>
    </div>
  `,
  styles: [
    `
      .container {
        padding: 24px;
      }
    `,
  ],
})
export class AppComponent {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIconLiteral(
      "thumbs-up",
      sanitizer.bypassSecurityTrustHtml(THUMBUP_ICON)
    );
    iconRegistry.addSvgIcon(
      "face",
      sanitizer.bypassSecurityTrustResourceUrl("/assets/icons/face.svg")
    );
    iconRegistry.addSvgIconSet(
      sanitizer.bypassSecurityTrustResourceUrl("/assets/icons-sprite.svg")
    );
  }
}
