const deleteFile = require('./deleteFile');

const deleteMultipleFiles = (files) => {
  files.forEach((file) => {
    if (file.path) {
      deleteFile(file.path);
    } else if (file.url) {
      deleteFile(file.url);
    }
  });
};

const addFileToStructure = (pathParts, file, currentNode) => {
  const filteredPathParts = pathParts.filter((part) => part.trim() !== '');

  for (let i = 0; i < filteredPathParts.length; i++) {
    const part = filteredPathParts[i];
    let nextNode = currentNode.children.find((child) => child.name === part);

    if (!nextNode) {
      if (i === filteredPathParts.length) {
        nextNode = { name: file.originalname, type: 'file', file: file };
      } else {
        nextNode = { name: part, type: 'folder', path: '', children: [] };
      }
      currentNode.children.push(nextNode);
    }

    currentNode = nextNode;
  }
};

module.exports = {
  deleteMultipleFiles,
  addFileToStructure,
};
