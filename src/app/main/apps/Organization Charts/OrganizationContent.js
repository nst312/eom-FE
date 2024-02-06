import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Typography from '@mui/material/Typography';
import OrganizationChart from './OrganizationChart';
import { getOrganizeChartData } from './store/organizationChartSlice';

function OrganizationContent() {
  const dispatch = useDispatch();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    dispatch(getOrganizeChartData()).then((resp) => setChartData(resp.payload));
  }, []);

    const sortDirectories = function (chartDatas, parent = null) {
      const node = [];
      chartDatas
        .filter((item) => {
          return item.parentId === parent;
        })
        .forEach((item) => {
          const cd = item;
          cd.child = sortDirectories(chartDatas, item.empId);
          return node.push(cd);
        });
      return node;
    };
    const tree = sortDirectories(chartData)

  if (tree.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <Typography color="textSecondary" variant="h5">
          Organization Chart Not Found!
        </Typography>
      </div>
    );
  }

  return (
    <div className="w-full">
      <OrganizationChart chartData={tree} />
    </div>
  );
}

export default OrganizationContent;
