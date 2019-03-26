const appendTagPerLine = (track, tag) => {
  const {lines} = track;
  if (track.line !== tag.location.line) {
    track.line = tag.location.line;
    lines.push([tag]);
  } else {
    lines[lines.length - 1].push(tag);
  }
  return track;
};

const groupTagsPerLine = (tags) => {
  if (tags.length === 0) {
    return [];
  }
  return tags.reduce(appendTagPerLine, {
    lines: [],
    line: tags[0].location.line - 1,
  }).lines;
};

module.exports = groupTagsPerLine;
