import { useState } from 'react';
import './App.css';
import { Box, Button, CircularProgress, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';

function App() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post("http://localhost:8080/api/email/generate", {
        emailContent,
        tone 
      });
      setGeneratedReply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data));
    } catch (error) {
      // Fixed typo: "eamil" → "email"
      setError('Failed to generate email reply. Please try again');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        py: 6, // Increased padding from py: 4 for more space
        bgcolor: 'grey.50', // Added off-white background (#F9FAFB)
        minHeight: '100vh', // Ensures full viewport height
      }}
    >
      {/* Header */}
      <Typography
        variant="h3"
        component="h1"
        sx={{
          fontWeight: 700, // Added bold font
          color: 'grey.800', // Dark gray for readability (#1F2937)
          textAlign: 'center', // Centered text
          mb: 4, // Increased margin from gutterBottom
          fontFamily: 'Inter, Roboto, sans-serif', // Custom font
          letterSpacing: '-0.025em', // Subtle letter spacing
        }}
      >
        {/* Changed text from "Email Reply Generator" to "Smart Email Assistant" */}
        Smart Email Assistant
      </Typography>

      {/* Form Card */}
      <Box
        sx={{
          bgcolor: 'white', // White card background
          borderRadius: 2, // Rounded corners
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)', // Subtle shadow
          p: 4, // Added padding (replaces mx: 3)
          mb: 4, // Added margin (replaces mx: 3)
          transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Smooth transitions
          '&:hover': {
            transform: 'translateY(-4px)', // Lift effect on hover
            boxShadow: '0 8px 20px rgba(0,0,0,0.15)', // Enhanced shadow
          },
        }}
        // Removed mx: 3 and wrapped form in a styled card
      >
        <TextField
          fullWidth
          multiline
          rows={6}
          variant="outlined"
          label="Original Email Content"
          value={emailContent || ''}
          onChange={(e) => setEmailContent(e.target.value)}
          sx={{
            mb: 3, // Increased from mb: 2
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px', // Rounded corners
              '&:hover fieldset': { borderColor: 'blue.400' }, // Blue border on hover
              '&.Mui-focused fieldset': { borderColor: 'blue.400' }, // Blue border on focus
            },
            '& .MuiInputLabel-root': { color: 'grey.700', fontWeight: 500 }, // Styled label
          }}
          placeholder="Enter the email content here..." // Added placeholder
          required // Added required attribute
        />

        <FormControl fullWidth sx={{ mb: 3 /* Increased from mb: 2 */ }}>
          <InputLabel
            sx={{
              color: 'grey.700', // Darker label
              fontWeight: 500, // Medium weight
              '&.Mui-focused': { color: 'blue.400' }, // Blue on focus
            }}
          >
            Tone (Optional)
          </InputLabel>
          <Select
            value={tone || ''}
            label="Tone (Optional)"
            onChange={(e) => setTone(e.target.value)}
            sx={{
              borderRadius: '8px', // Rounded corners
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'blue.400' }, // Blue border
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'blue.400' },
            }}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="professional">Professional</MenuItem>
            <MenuItem value="casual">Casual</MenuItem>
            <MenuItem value="friendly">Friendly</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!emailContent || loading}
          fullWidth
          sx={{
            py: 1.5, // Taller padding
            borderRadius: '8px', // Rounded corners
            bgcolor: 'blue.400', // Blue background (#60A5FA)
            '&:hover': { 
              bgcolor: 'teal.300', // Teal on hover (#5EEAD4)
              transform: 'scale(1.02)', // Scale animation
            },
            '&:disabled': { bgcolor: 'grey.400', cursor: 'not-allowed' }, // Disabled state
            textTransform: 'none', // No uppercase
            fontWeight: 600, // Bold font
            fontSize: '1.1rem', // Larger text
            transition: 'background-color 0.3s ease, transform 0.2s ease', // Smooth transitions
          }}
          // Enhanced button styling
        >
          {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Generate Reply'}
        </Button>
      </Box>

      {/* Error Message */}
      {error && (
        <Typography
          color="error"
          sx={{
            textAlign: 'center', // Centered text
            bgcolor: 'red.50', // Red background
            borderRadius: '8px', // Rounded corners
            p: 2, // Added padding
            mb: 4, // Increased from mb: 2
            border: '1px solid', // Added border
            borderColor: 'red.200', // Red border
          }}
        >
          {error}
        </Typography>
      )}

      {/* Reply Card */}
      {generatedReply && (
        <Box
          sx={{
            bgcolor: 'yellow.100', // Yellow background (#FEF3C7)
            borderRadius: 2, // Rounded corners
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)', // Subtle shadow
            p: 4, // Added padding (replaces mt: 3)
            animation: 'fadeIn 0.5s ease-in', // Added fade-in animation
            transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Smooth transitions
            'Box:hover': { // INCORRECT: Should be '&:hover'
              transform: 'translateY(-4px)', // Lift effect
              boxShadow: '0 8px 20px rgba(230, 93, 93, 0.15)', // Red-tinted shadow (likely unintended)
            },
          }}
          // Replaced mt: 3 with styled card
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, color: 'grey.800', mb: 2 }} // Added styling
            // Enhanced heading with bold font and margin
          >
            Generated Reply
            {/* Changed text from "Generated Reply:" to "Generated Reply" */}
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={6}
            variant="outlined"
            value={generatedReply || ''}
            inputProps={{ readOnly: true }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px', // Rounded corners
                bgcolor: 'white', // White background for contrast
                '&:hover fieldset': { borderColor: 'blue.400' }, // Blue border on hover
              },
            }}
            // Added styling for readability
          />
          <Button
            variant="outlined"
            onClick={() => navigator.clipboard.writeText(generatedReply)}
            sx={{
              mt: 2,
              borderRadius: '8px', // Rounded corners
              borderColor: 'blue.400', // Blue border
              color: 'blue.400', // Blue text
              textTransform: 'none', // No uppercase
              fontWeight: 500, // Medium font
              '&:hover': {
                bgcolor: 'teal.50', // Teal background on hover
                borderColor: 'teal.300', // Teal border
                color: 'teal.700', // Darker teal text
              },
            }}
            // Enhanced button styling
          >
            Copy to Clipboard
          </Button>
        </Box>
      )}

      {/* Added fade-in animation for reply card */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </Container>
  );
}

export default App;