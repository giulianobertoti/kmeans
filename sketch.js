let kmeansModel
const width = 640;
const height = 480;
const colDict = {
  0: 'skyblue',
  1: 'coral',
  2: 'olive',
  3: 'tan',
  4: 'grey'
}

const names = [{name: 'john'}, {name: 'mary'}, {name: 'anne'}, {name: 'paul'}, {name: 'george'}];
const data = [{ x: 300, y: 4}, { x: 2000, y: 3}, { x: 450, y: 5}, { x: 1500, y: 2}, { x: 850, y: 4}];


const options = {
  k: 2,
  maxIter: 10,
  threshold: 2,
};


kmeansModel = ml5.kmeans(data, options, clustersCalculated);


function clustersCalculated() {
  console.log('Points Clustered!');
  console.log(kmeansModel);

  const dataset = kmeansModel.dataset;
  
  //d3.select('svg').remove();

  const svg = d3.select('svg');

  const xScale = d3.scaleLinear()
    .domain(d3.extent(dataset, d => d[0]))
    .range([10, width - 100]);

  
  const yScale = d3.scaleLinear()
    .domain(d3.extent(dataset, d => d[1]))
    .range([height - 50, 20]);
  

  const circle_data = svg.selectAll('circle')
    .data(dataset)
    .enter();
    
    
  const circles = circle_data.append('circle')
    .attr('cx', d => xScale(d[0]))
    .attr('cy', d => yScale(d[1]))
    .attr('r', 9)
    .attr('fill', (d, i) => colDict[dataset[i].centroid]);
    
  
  circle_data.append('text')
    .attr('dy', d => yScale(d[1]))
    .attr('dx', d => xScale(d[0]))
    .data(names)
    .text(d => d.name);
  
}  
