import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  IconResolver,
  MatIconModule,
  MatIconRegistry,
} from "@angular/material/icon";
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
      <h2>addSvgIcon</h2>
      <mat-icon
        svgIcon="face"
        aria-hidden="false"
        aria-label="Example face SVG icon"
      ></mat-icon>
      <h2>addSvgIconInNamespace</h2>
      <mat-icon
        svgIcon="app:face"
        aria-hidden="false"
        aria-label="Example face SVG icon"
      ></mat-icon>
      <h2>addSvgIconLiteral</h2>
      <mat-icon
        svgIcon="thumbs-up"
        aria-hidden="false"
        aria-label="Example thumbs-up SVG icon"
      ></mat-icon>
      <h2>addSvgIconLiteralInNamespace</h2>
      <mat-icon
        svgIcon="app:thumbs-up"
        aria-hidden="false"
        aria-label="Example thumbs-up SVG icon"
      ></mat-icon>
      <h2>addSvgIconResolver</h2>
      <mat-icon
        svgIcon="done"
        aria-hidden="false"
        aria-label="Example done SVG icon"
      ></mat-icon>
      <mat-icon
        svgIcon="favorite"
        aria-hidden="false"
        aria-label="Example favorite SVG icon"
      ></mat-icon>
      <h2>addSvgIconSet</h2>
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
    // addSvgIcon
    iconRegistry.addSvgIcon(
      "face",
      sanitizer.bypassSecurityTrustResourceUrl("/assets/single-icon/face.svg")
    );
    iconRegistry.addSvgIconInNamespace(
      "app",
      "face",
      sanitizer.bypassSecurityTrustResourceUrl("/assets/single-icon/face.svg")
    );

    // addSvgIconLiteral
    iconRegistry.addSvgIconLiteral(
      "thumbs-up",
      sanitizer.bypassSecurityTrustHtml(THUMBUP_ICON)
    );
    iconRegistry.addSvgIconLiteralInNamespace(
      "app",
      "thumbs-up",
      sanitizer.bypassSecurityTrustHtml(THUMBUP_ICON)
    );

    // addSvgIconResolver
    const resolver: IconResolver = (name) =>
      // for this demo, excluding settings and search
      // they need to be loaded from addSvgIconSet
      !["settings", "search"].includes(name) &&
      sanitizer.bypassSecurityTrustResourceUrl(`/assets/icons/${name}.svg`);
    iconRegistry.addSvgIconResolver(resolver);

    // addSvgIconSet
    // We con also load in default namespace, but as we have used resolver,
    // it will cause issue, hence using  addSvgIconSetInNamespace
    iconRegistry.addSvgIconSet(
      sanitizer.bypassSecurityTrustResourceUrl("/assets/icons-sprite.svg")
    );
  }
}
