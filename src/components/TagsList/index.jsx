import Badge from "react-bootstrap/Badge";
import Stack from "react-bootstrap/Stack";

function TagsList({ tags, setTags }) {
  function updateTagList(index) {
    if (tags.length > 1) {
      const newTagList = [...tags.slice(0, index), ...tags.slice(index + 1)];
      setTags(newTagList);
    } else {
      setTags([]);
    }
  }
  return (
    <Stack direction="horizontal" gap={2}>
      {tags
        .map((tag, index) => ({ name: tag.name, index: index }))
        .map((tag) => (
          <Badge
            key={tag.index} // Adding a unique key is important when rendering a list of elements.
            bg="success"
          >
            {tag.name}
          </Badge>
        ))}
    </Stack>
  );
}

export default TagsList;
