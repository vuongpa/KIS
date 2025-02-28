import React, { useState } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import { Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProductOverviewModal from "./component/full-screen-dialog";


export const Dashboard = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigateToCreateNewApp = () => {
    handleMenuClose();
    navigate("/create-new-app"); // Điều hướng đến CreateNewApp
  };

  
  return (
    <div className="bg-white p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <p>All projects you have (0)</p>

        {/* Buttons Group */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant="outlined"
              endIcon={<KeyboardArrowDown />}
              className="bg-white text-black border-gray-500 rounded-lg px-4 py-2 hover:border-gray-700"
              style={{
                fontFamily: "Roboto",
                fontSize: "16px",
                fontWeight: "400",
                fontStyle: "normal",
                lineHeight: "1.5",
                color: "#000",
                textTransform: "none",
                borderColor: "gray",
              }}
            >
              All project
            </Button>
          </div>
           {/* Create New App Button */}
           <Button
            variant="contained"
            color="primary"
            onClick={handleMenuOpen}
          >
            + Create New App
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={isMenuOpen}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleNavigateToCreateNewApp}>Create Mobile App</MenuItem>
            <MenuItem onClick={handleMenuClose}>Create Tablet App</MenuItem>
            <MenuItem onClick={handleMenuClose}>Create Web/Desktop App</MenuItem>
          </Menu>
        </div>
      </div>

      {/* Description Section */}
      <div className="mb-8">
        <Typography variant="body1" className="text-gray-700">
          Welcome to Ranoar. Create a new app to get started. <br />
          You can create from scratch or save your time by choosing our pre-designed template.
        </Typography>
      </div>

      <hr className="my-4 " />

      {/* Onboarding Resources */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Product Overview */}
        <Card
          className="bg-white shadow-md p-4 cursor-pointer"
          onClick={handleOpenModal}
        >
          <div className="flex items-start">
            <div className="mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M21 6L11 1L1 6V16L11 21L21 16V6Z" stroke="#0081BD" strokeWidth="2" strokeLinejoin="round" />
                <path d="M1 6L11 11" stroke="#0081BD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M11 21V11" stroke="#0081BD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M21 6L11 11" stroke="#0081BD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 3.5L6 8.5" stroke="#0081BD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <CardContent className="p-0">
              <Typography className="text-gray-700 mb-2"> Product Overview</Typography>
              <Typography variant="h6" className="mb-1 text-gray-900 font-semibold">
                How Ranoar Works
              </Typography>
              <div className="flex items-center text-gray-500 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2.50002 1.5L9.50002 6L2.50002 10.5V1.5Z" stroke="#374151" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                4:12
              </div>
            </CardContent>
          </div>
        </Card>
        {/* Card 2: Features Overview */}
        <Card className="bg-white shadow-md p-4">
          <div className="flex items-start">
            {/* Icon */}
            <div className="mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <g clip-path="url(#clip0_16_13061)">
                  <path d="M10.537 0.904015L6.602 12.04L11.4 12.077L7.652 23.095V23.097L17.996 8.39002H12.974L17.847 0.903015H14.023L10.537 0.904015ZM6.903 4.91002C6.74861 4.9101 6.60052 4.9712 6.491 5.08002L0.155 11.285C0.0549829 11.407 0.000321388 11.5598 0.000321388 11.7175C0.000321388 11.8752 0.0549829 12.0281 0.155 12.15L6.603 18.546C6.71699 18.6459 6.86341 18.701 7.015 18.701C7.16659 18.701 7.31301 18.6459 7.427 18.546C7.53565 18.4282 7.59597 18.2738 7.59597 18.1135C7.59597 17.9532 7.53565 17.7988 7.427 17.681L1.991 12.151C1.88299 12.0329 1.8231 11.8786 1.8231 11.7185C1.8231 11.5584 1.88299 11.4042 1.991 11.286L7.315 5.94202C7.37675 5.88814 7.42624 5.82166 7.46015 5.74706C7.49407 5.67246 7.51161 5.59146 7.51161 5.50952C7.51161 5.42757 7.49407 5.34657 7.46015 5.27197C7.42624 5.19737 7.37675 5.13089 7.315 5.07702C7.20526 4.96866 7.05722 4.90794 6.903 4.90802V4.91002ZM17.096 4.91002C16.9416 4.9101 16.7935 4.9712 16.684 5.08002C16.6221 5.13371 16.5725 5.20007 16.5385 5.2746C16.5045 5.34913 16.4869 5.43009 16.4869 5.51202C16.4869 5.59394 16.5045 5.6749 16.5385 5.74943C16.5725 5.82396 16.6221 5.89032 16.684 5.94402L22.119 11.287C22.2275 11.4051 22.2877 11.5596 22.2877 11.72C22.2877 11.8804 22.2275 12.0349 22.119 12.153L16.571 17.683C16.4628 17.8011 16.4027 17.9554 16.4027 18.1155C16.4027 18.2757 16.4628 18.43 16.571 18.548C16.685 18.6479 16.8314 18.703 16.983 18.703C17.1346 18.703 17.281 18.6479 17.395 18.548L23.845 12.152C23.9454 12.0302 24.0003 11.8773 24.0003 11.7195C24.0003 11.5617 23.9454 11.4088 23.845 11.287L17.508 5.07902C17.3983 4.97057 17.2502 4.90983 17.096 4.91002Z" fill="#0081BD" />
                </g>
                <defs>
                  <clipPath id="clip0_16_13061">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            {/* Content */}
            <CardContent className="p-0">
              <Typography className="text-gray-700 mb-2"> Features Overview</Typography>
              <Typography variant="h6" className="mb-1 text-gray-900 font-semibold">
                Our Features
              </Typography>
            </CardContent>
          </div>
        </Card>

        {/* Card 3: Product Walkthrough */}
        <Card className="bg-white shadow-md p-4">
          <div className="flex items-start">
            {/* Icon */}
            <div className="mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 5.25V21M12 5.25C12 5.25 6.75 0.749997 1.5 4.5V21C6.75 17.25 12 21 12 21C12 21 17.25 17.25 22.5 21V4.5C17.25 0.749997 12 5.25 12 5.25Z" stroke="#0081BD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
            {/* Content */}
            <CardContent className="p-0">
              <Typography className="text-gray-700 mb-2">Product Walkthrough</Typography>
              <Typography variant="h6" className="mb-1 text-gray-900 font-semibold">
                Onboarding
              </Typography>

              <div className="flex items-center text-gray-500 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2.50003 1.5L9.50003 6L2.50003 10.5V1.5Z" stroke="#374151" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                3:53
              </div>
            </CardContent>
          </div>
        </Card>
        {/* Card 4: FAQ */}
        <Card className="bg-white shadow-md p-4">
          <div className="flex items-start">
            {/* Icon */}
            <div className="mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 1.5C9.9233 1.5 7.89323 2.11581 6.16652 3.26957C4.4398 4.42332 3.09399 6.0632 2.29927 7.98182C1.50455 9.90045 1.29661 12.0116 1.70176 14.0484C2.1069 16.0852 3.10693 17.9562 4.57538 19.4246C6.04383 20.8931 7.91476 21.8931 9.95156 22.2982C11.9884 22.7034 14.0996 22.4955 16.0182 21.7007C17.9368 20.906 19.5767 19.5602 20.7304 17.8335C21.8842 16.1068 22.5 14.0767 22.5 12C22.5 9.21523 21.3938 6.54451 19.4246 4.57538C17.4555 2.60625 14.7848 1.5 12 1.5ZM12 21C10.22 21 8.47992 20.4722 6.99987 19.4832C5.51983 18.4943 4.36628 17.0887 3.68509 15.4442C3.0039 13.7996 2.82567 11.99 3.17294 10.2442C3.5202 8.49836 4.37737 6.89471 5.63604 5.63604C6.89472 4.37737 8.49836 3.5202 10.2442 3.17293C11.99 2.82567 13.7996 3.0039 15.4442 3.68508C17.0887 4.36627 18.4943 5.51983 19.4832 6.99987C20.4722 8.47991 21 10.22 21 12C21 14.3869 20.0518 16.6761 18.364 18.364C16.6761 20.0518 14.387 21 12 21Z" fill="#0081BD" />
                <path d="M12 18.75C12.6213 18.75 13.125 18.2463 13.125 17.625C13.125 17.0037 12.6213 16.5 12 16.5C11.3787 16.5 10.875 17.0037 10.875 17.625C10.875 18.2463 11.3787 18.75 12 18.75Z" fill="#0081BD" />
                <path d="M12.75 6.00001H11.625C11.1815 5.99902 10.7422 6.08564 10.3323 6.2549C9.92236 6.42416 9.54991 6.67272 9.23632 6.98632C8.92272 7.29991 8.67416 7.67236 8.5049 8.08228C8.33564 8.4922 8.24902 8.93152 8.25001 9.37501V9.75001H9.75001V9.37501C9.75001 8.87773 9.94755 8.40081 10.2992 8.04918C10.6508 7.69755 11.1277 7.50001 11.625 7.50001H12.75C13.2473 7.50001 13.7242 7.69755 14.0758 8.04918C14.4275 8.40081 14.625 8.87773 14.625 9.37501C14.625 9.87229 14.4275 10.3492 14.0758 10.7008C13.7242 11.0525 13.2473 11.25 12.75 11.25H11.25V14.625H12.75V12.75C13.6451 12.75 14.5036 12.3944 15.1365 11.7615C15.7694 11.1286 16.125 10.2701 16.125 9.37501C16.125 8.4799 15.7694 7.62146 15.1365 6.98852C14.5036 6.35559 13.6451 6.00001 12.75 6.00001Z" fill="#0081BD" />
              </svg>
            </div>
            {/* Content */}
            <CardContent className="p-0">
              <Typography className="text-gray-700">Frequently Asked Questions</Typography>
              <Typography variant="h6" className="mb-1 text-gray-900 font-semibold">
                Get Help
              </Typography>

            </CardContent>
          </div>
        </Card>
      </div>

      {/* Product Overview Modal */}
      <ProductOverviewModal open={isModalOpen} handleClose={handleCloseModal} />
    </div>
  );
};
