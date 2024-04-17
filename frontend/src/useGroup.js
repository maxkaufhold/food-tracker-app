import { useState } from 'react';

export default function useGroup() {
  const getGroup = () => {
    const groupString = sessionStorage.getItem('group');
    const group = JSON.parse(groupString);
    return group;
  };

  const [group, setGroup] = useState(getGroup());

  const saveGroup = group => {
    sessionStorage.setItem('group', JSON.stringify(group));
    setGroup(group);
    window.location.reload();
  };

  return {
    setGroup: saveGroup,
    group
  };
}
