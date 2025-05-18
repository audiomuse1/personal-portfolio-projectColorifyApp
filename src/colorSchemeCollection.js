


export default class ColorSchemeCollection {
    constructor() {
      this.colorSchemes = [
        ["Halloween", "orange", "black"],
        ["Christmas", "red", "green"],
        ["Valentines", "pink", "red"],
        ["St. Patricks Day", "#099441", "#60A830"]
      ];
    }
  
    getColorSchemes() {
      return this.colorSchemes;
    }
  
    getColorScheme(index) {
      return this.colorSchemes[index];
    }
  }
  
  // Create an instance of the ColorSchemeCollection class
  const colorSchemesCollection = new ColorSchemeCollection();
  
  // Accessing the entire array of color schemes and individual color schemes
  console.log(colorSchemesCollection.getColorSchemes()); // Entire color schemes array
  console.log(colorSchemesCollection.getColorScheme(0)); // ["Halloween", "orange", "black"]
  console.log(colorSchemesCollection.getColorScheme(1)); // ["Christmas", "red", "green"]
  console.log(colorSchemesCollection.getColorScheme(2)); // ["Valentines", "pink", "red"]
  console.log(colorSchemesCollection.getColorScheme(3)); // ["St. Patricks Day", "#099441", "#60A830"]


