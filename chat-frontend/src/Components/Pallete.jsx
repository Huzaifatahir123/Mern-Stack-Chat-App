import React from 'react';
import { useStore } from '../../libs/Zustand';
import { Palette, Check } from 'lucide-react';

const BubbleThemeSelector = () => {
    const { bubbleTheme, availableThemes, setBubbleTheme } = useStore();

    return (
        <div className="p-4 bg-gray-900 rounded-xl shadow-lg border border-gray-800 text-white">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Palette size={20} /> My Message Color
            </h3>
            
            <div className="flex flex-wrap gap-4 justify-center">
                {availableThemes.map((theme) => (
                    <button
                        key={theme.name}
                        onClick={() => setBubbleTheme(theme.name)}
                        className={`w-20 h-20 rounded-full flex items-center justify-center 
                                    shadow-xl transform transition-transform duration-150 ease-in-out
                                    ${theme.name === bubbleTheme.name ? 'ring-4 ring-offset-2 ring-white ring-offset-black scale-105' : 'hover:scale-105'}
                                    ${theme.primary} ${theme.text}
                                `}
                    >
                        {theme.name === bubbleTheme.name ? (
                            <Check size={28} className={`text-black`} />
                        ) : (
                            <span className="text-sm font-semibold">{theme.name}</span>
                        )}
                    </button>
                ))}
            </div>
            
            <p className="text-xs text-gray-500 mt-4 text-center">
                This theme applies only to the messages you send.
            </p>
        </div>
    );
};

export default BubbleThemeSelector;