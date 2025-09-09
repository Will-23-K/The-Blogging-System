const User = require('../models/User');

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('followers', 'username avatar')
      .populate('following', 'username avatar');
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const { bio, category, location } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { bio, category, location },
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// Update word of the day
exports.updateWordOfDay = async (req, res) => {
  try {
    const { word } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { 
        wordOfTheDay: word,
        lastWordUpdate: Date.now()
      },
      { new: true }
    );
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// Follow/Unfollow user
exports.toggleFollow = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUser = await User.findById(req.user.id);
    const targetUser = await User.findById(userId);
    
    if (!targetUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    const isFollowing = currentUser.following.includes(userId);
    
    if (isFollowing) {
      // Unfollow
      currentUser.following.pull(userId);
      targetUser.followers.pull(req.user.id);
    } else {
      // Follow
      currentUser.following.push(userId);
      targetUser.followers.push(req.user.id);
    }
    
    await currentUser.save();
    await targetUser.save();
    
    res.status(200).json({
      success: true,
      message: isFollowing ? 'Unfollowed successfully' : 'Followed successfully',
      data: {
        followers: targetUser.followers.length,
        following: currentUser.following.length
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};