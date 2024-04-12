// import ReactWordcloud from 'react-wordcloud';


// const WordCloud = ({ text }) => {
//     const wordsArray = text.split(/\W+/).filter(word => word.length > 2);

//     // Step 2: Count word occurrences
//     const wordCounts = wordsArray.reduce((acc, word) => {
//         acc[word] = (acc[word] || 0) + 1;
//         return acc;
//     }, {});

//     // Step 3: Convert to desired format
//     const words = Object.entries(wordCounts).map(([text, value]) => ({ text, value }));
//     console.log(words);
//     return (
//         // <div>hi</div>
//         <ReactWordcloud words={words}></ReactWordcloud>
//     )
// }

// export default WordCloud

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import cloud from 'd3-cloud';

const WordCloud = ({ text }) => {
 const ref = useRef();

 useEffect(() => {
    const draw = (words) => {
      // Clear the SVG element before appending a new word cloud
      d3.select(ref.current).selectAll('*').remove();

      d3.select(ref.current)
        .append('svg')
        .attr('width', 500)
        .attr('height', 500)
        .append('g')
        .attr('transform', 'translate(250,250)')
        .selectAll('text')
        .data(words)
        .enter().append('text')
        .style('font-size', d => `${d.size}px`)
        .style('font-family', 'Impact')
        .style('fill', 'white')
        .attr('text-anchor', 'middle')
        .attr('transform', d => `translate(${[d.x, d.y]})rotate(${d.rotate})`)
        .text(d => d.text);
    };

    const wordsArray = text.split(/\W+/).filter(word => word.length > 2);

    // Step 2: Count word occurrences
    const wordCounts = wordsArray.reduce((acc, word) => {
        acc[word] = (acc[word] || 0) + 10;
        return acc;
    }, {});

    // Step 3: Convert to desired format
    const words = Object.entries(wordCounts).map(([text, size]) => ({ text, size }));

    cloud()
      .size([500, 500])
      .words(words)
      .rotate(() => ~~(Math.random() * 2) * 90)
      .font('Impact')
      .fontSize(d => d.size)
      .on('end', draw)
      .start();
 }, [text]);

 return <div className='flex justify-center' ref={ref}></div>;
};

export default WordCloud;
