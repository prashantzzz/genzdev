#include<iostream>
#include<vector>
using namespace std;
vector<vector<int>>subsets;
void subset_gen(vector<int>subset, int i, vector<int>nums){
    if(i==nums.size()){
        cout<<i<<": [";
        for(auto j:subset)
            cout<<j<<", ";
        cout<<"]"<<endl;
        
        subsets.push_back(subset);
        return;
    }
    subset_gen(subset,i+1,nums);

    subset.push_back(nums[i]);
    subset_gen(subset,i+1,nums);
    subset.pop_back();
}

int main(){
    vector<int>nums={1,2,3};
    subset_gen({},0,nums);
    // for(auto i:subsets){
    //     cout<<"[";
    //     for(auto j:i)
    //         cout<<j<<", ";
    //     cout<<"]"<<endl;
    // }
}