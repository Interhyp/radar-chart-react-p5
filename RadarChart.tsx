import Sketch from "react-p5";
import p5Types from "p5"; //Typen von p5

interface RadarChartValue {
  name: string;
  value: number;
}

//Demodaten
const values: RadarChartValue[] = [
  {
    name: "Mathe",
    value: 5,
  },
  {
    name: "Sport",
    value: 9,
  },
  {
    name: "Statistik",
    value: 8,
  },
  {
    name: "Physik",
    value: 10,
  },
  {
    name: "Französisch",
    value: 6,
  },
  {
    name: "Musik",
    value: 2,
  },
  {
    name: "Biologie",
    value: 4,
  },
  {
    name: "Englisch",
    value: 9,
  },
];

function RadarChart() {
  /* Eingabewerte, um den Code clean zu halten*/
  const padding = 100; // Der Abstand innterhalb des Canvases der dafür sorgt, dass der Text nicht abgeschnitten ist
  const canvasSize = 700; // Die Größe der Zeichenfläche in px
  const numberOfElements = values.length; // Die Anzahl der Unterschiedlichen Dimensionen
  const numberOfPossibleSelections = 10; // Die Anzahl unterschiedlicher Wertungen

  /* Berechnung einiger Konstanten, die wir brauchen */
  const center = canvasSize / 2; // Die Mitte der Zeichenfläche
  const spiderRadius = canvasSize / 2 - padding; // Die Länge der Linien, die nach außen gehen
  const spaceBetweenCircles = spiderRadius / numberOfPossibleSelections; // Der Abstand zwischen den Ringen
  const singleElementAngle = 360 / numberOfElements; // Der Winkel der Dimensionen

  /* Helper-Methode, um den Text optimal auszurichten*/
  function setTextAlignBasedOnAngle(p5: p5Types, angle: number) {
    if (angle >= -10 && angle < 10) {
      p5.textAlign(p5.LEFT, p5.CENTER);
    } else if (angle >= 10 && angle < 80) {
      p5.textAlign(p5.LEFT, p5.TOP);
    } else if (angle >= 80 && angle < 100) {
      p5.textAlign(p5.CENTER, p5.TOP);
    } else if (angle >= 100 && angle < 170) {
      p5.textAlign(p5.RIGHT, p5.TOP);
    } else if (angle >= 170 && angle < 190) {
      p5.textAlign(p5.RIGHT, p5.CENTER);
    } else if (angle >= 190 && angle < 260) {
      p5.textAlign(p5.RIGHT, p5.BOTTOM);
    } else if (angle >= 260 && angle < 280) {
      p5.textAlign(p5.CENTER, p5.BOTTOM);
    } else if (angle >= 280 && angle < 350) {
      p5.textAlign(p5.LEFT, p5.BOTTOM);
    } else {
      p5.textAlign(p5.CENTER, p5.CENTER);
    }
  }

  /* Setup Methode */
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(canvasSize, canvasSize).parent(canvasParentRef);
    p5.angleMode("degrees");
    p5.textSize(14);
  };

  /* Sich wiederholdende draw Methode */
  const draw = (p5: p5Types) => {
    p5.background(255);

    /* Ringe im Hintergrund */
    p5.strokeWeight(3);
    p5.stroke(230);
    for (let circle = 1; circle <= numberOfPossibleSelections; circle++) {
      p5.noFill();
      p5.ellipse(
        center,
        center,
        spaceBetweenCircles * circle * 2,
        spaceBetweenCircles * circle * 2
      );
    }

    /* Spinnennetz */
    p5.stroke(200);
    p5.strokeWeight(4);
    for (let i = 0; i < numberOfElements; i++) {
      p5.strokeWeight(4);
      var angle = singleElementAngle * i;

      var dx = spiderRadius * p5.cos(angle);
      var dy = spiderRadius * p5.sin(angle);

      p5.line(center, center, center + dx, center + dy);
    }

    /* Texte */
    p5.strokeWeight(0);
    p5.fill(0);
    for (let i = 0; i < numberOfElements; i++) {
      const textAngle = singleElementAngle * i;
      dx = (spiderRadius + 20) * p5.cos(textAngle);
      dy = (spiderRadius + 20) * p5.sin(textAngle);

      setTextAlignBasedOnAngle(p5, textAngle);
      p5.text(values[i].name, center + dx, center + dy);
    }

    /* Vektor und  Datenpunkte*/
    p5.strokeWeight(4);
    p5.stroke("#ee7900");
    p5.fill(228, 121, 0, 100);
    p5.beginShape();
    for (var pointIndex = 0; pointIndex < values.length; pointIndex++) {
      const pointAngle = singleElementAngle * pointIndex; // Berechnet den Winkel der jeweiligen Dimension
      const radiusForPoint = spaceBetweenCircles * values[pointIndex].value;

      const dxPoint = radiusForPoint * p5.cos(pointAngle);
      const dyPoint = radiusForPoint * p5.sin(pointAngle);

      p5.vertex(center + dxPoint, center + dyPoint);

      p5.ellipse(center + dxPoint, center + dyPoint, 7, 7); // Da wir die Koordinaten des Datenpunktes hier schon berechnet haben können wir an diesen direkt den Punkt zeichnen
    }
    p5.endShape(p5.CLOSE);
  };

  return <Sketch setup={setup} draw={draw} />;
}

export { RadarChart };
