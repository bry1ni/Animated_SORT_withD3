// script.js
function bubblesort(array) {
    const transitions = [];

    function swap(i, j) {
        [array[i], array[j]] = [array[j], array[i]];
    }

    let swaped;
    do {
        swaped = false;
        for (let i = 1; i < array.length; i++) {
            if (array[i - 1] > array[i]) {
                swap(i - 1, i);
                transitions.push([...array]);
                swaped = true;
            }
        }
    } while (swaped);

    return transitions;
}

function visualizeTableau() {
    const tailleTableau = parseInt(document.getElementById('tailleTableau').value, 10);
    const tableauInitial = Array.from({ length: tailleTableau }, () => Math.floor(Math.random() * 10) + 1);
    const svgContainer = document.querySelector('.svg-container');

    svgContainer.innerHTML = ''; // Clear existing svg
    const svg = d3.select(svgContainer).append("svg")
        .attr("width", 100 * tailleTableau)
        .attr("height", 150);

    const transitions = bubblesort([...tableauInitial]);
    transitions.forEach((t, index) => {
        setTimeout(() => {
            updateBars(svg, t, index === transitions.length - 1);
        }, index * 1000);
    });
}

function updateBars(svg, data, isFinalTransition) {
    const bars = svg.selectAll("rect").data(data);

    bars.exit().remove();

    bars.enter()
        .append("rect")
        .merge(bars)
        .transition()
        .duration(500)
        .attr("x", (d, i) => i * 100)
        .attr("y", d => 100 - d * 10)
        .attr("width", 50)
        .attr("height", d => d * 10)
        .attr("fill", isFinalTransition ? "Green" : "Red");

    const labels = svg.selectAll("text").data(data);

    labels.exit().remove();

    labels.enter()
        .append("text")
        .merge(labels)
        .attr("x", (d, i) => i * 100 + 25)
        .attr("y", 120)
        .attr("text-anchor", "middle")
        .text(d => d);
}
